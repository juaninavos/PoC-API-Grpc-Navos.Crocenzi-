const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const readline = require('readline');

// Configuración del proto loader
const PROTO_PATH = path.join(__dirname, '../proto/alumno.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const alumnoProto = grpc.loadPackageDefinition(packageDefinition).alumno;

// Crear cliente gRPC
const client = new alumnoProto.AlumnoService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Configurar readline para input del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ============ Funciones gRPC ============

function contarAlumnos() {
  return new Promise((resolve, reject) => {
    client.getAlumnoCount({}, (error, response) => {
      if (error) {
        console.error('Error:', error.message);
        reject(error);
      } else {
        console.log(`Total de alumnos: ${response.count}`);
        resolve(response);
      }
    });
  });
}

function listarAlumnos() {
  return new Promise((resolve, reject) => {
    client.getAllAlumnos({}, (error, response) => {
      if (error) {
        console.error('Error:', error.message);
        reject(error);
      } else {
        console.log(`\nAlumnos encontrados: ${response.alumnos.length}`);
        response.alumnos.forEach((alumno, index) => {
          console.log(`${index + 1}. ${alumno.name} ${alumno.lastname} - ${alumno.mail}`);
        });
        resolve(response);
      }
    });
  });
}

function agregarAlumno(name, lastname, mail) {
  return new Promise((resolve, reject) => {
    const request = { name, lastname, mail };
    
    client.addAlumno(request, (error, response) => {
      if (error) {
        console.error('Error:', error.message);
        reject(error);
      } else {
        if (response.success) {
          console.log(`Alumno ${response.alumno.name} ${response.alumno.lastname} agregado correctamente`);
        } else {
          console.log(`Error: ${response.message}`);
        }
        resolve(response);
      }
    });
  });
}

// ============ Menú ============

function mostrarMenu() {
  console.log('\n=== Cliente gRPC ===');
  console.log('1. Contar alumnos');
  console.log('2. Listar alumnos');
  console.log('3. Agregar alumno');
  console.log('4. Salir');
}

function preguntarOpcion() {
  return new Promise((resolve) => {
    rl.question('Opción: ', (respuesta) => {
      resolve(respuesta.trim());
    });
  });
}

function preguntarDatosAlumno() {
  return new Promise((resolve) => {
    rl.question('Nombre: ', (nombre) => {
      rl.question('Apellido: ', (apellido) => {
        rl.question('Email: ', (email) => {
          resolve({ nombre, apellido, email });
        });
      });
    });
  });
}

async function procesarOpcion(opcion) {
  try {
    switch (opcion) {
      case '1':
        await contarAlumnos();
        break;
        
      case '2':
        await listarAlumnos();
        break;
        
      case '3':
        const datos = await preguntarDatosAlumno();
        await agregarAlumno(datos.nombre, datos.apellido, datos.email);
        break;
        
      case '4':
        console.log('\nCerrando cliente...');
        client.close();
        rl.close();
        process.exit(0);
        break;
        
      default:
        console.log('\nOpción inválida. Por favor selecciona 1, 2, 3 o 4.');
        break;
    }
  } catch (error) {
    console.error('\nError al ejecutar la operación:', error.message);
    console.log('\nAsegúrate de que el servidor esté corriendo:');
    console.log('   npm run start:server');
  }
}

async function menuPrincipal() {
  console.log('Conectando al servidor gRPC en localhost:50051...\n');
  
  // Verificar conexión inicial
  try {
    await contarAlumnos();
    console.log('\nConexión establecida correctamente');
  } catch (error) {
    console.error('\nNo se pudo conectar al servidor');
    console.log('Asegúrate de ejecutar primero: npm run start:server');
    process.exit(1);
  }
  
  // Bucle principal del menú
  while (true) {
    mostrarMenu();
    const opcion = await preguntarOpcion();
    await procesarOpcion(opcion);
    
    // Pausa antes de mostrar el menú nuevamente
    if (opcion !== '4') {
      await new Promise(resolve => {
        rl.question('\nPresiona Enter para continuar...', () => resolve());
      });
    }
  }
}

// ============ PUNTO DE ENTRADA ============

if (require.main === module) {
  menuPrincipal().catch((error) => {
    console.error('Error fatal:', error);
    process.exit(1);
  });
}
