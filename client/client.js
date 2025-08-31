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

// ============ FUNCIONES gRPC INDIVIDUALES ============

/**
 * 1. Contar alumnos - GetAlumnoCount
 * Llama a: servidor.getAlumnoCount()
 * Envía: {} (request vacío)
 * Recibe: { count: number }
 */
function contarAlumnos() {
  console.log('\nEJECUTANDO: GetAlumnoCount');
  console.log('   Llamada gRPC: client.getAlumnoCount({}, callback)');
  console.log('   Envía: {} (sin parámetros)');
  console.log('   Espera: { count: number }\n');
  
  return new Promise((resolve, reject) => {
    client.getAlumnoCount({}, (error, response) => {
      if (error) {
        console.error('Error en GetAlumnoCount:', error.message);
        reject(error);
      } else {
        console.log('Respuesta del servidor:');
        console.log(`   Total de alumnos: ${response.count}`);
        resolve(response);
      }
    });
  });
}

/**
 * 2. Listar alumnos - GetAllAlumnos  
 * Llama a: servidor.getAllAlumnos()
 * Envía: {} (request vacío)
 * Recibe: { alumnos: [array de objetos Alumno] }
 */
function listarAlumnos() {
  console.log('\nEJECUTANDO: GetAllAlumnos');
  console.log('   Llamada gRPC: client.getAllAlumnos({}, callback)');
  console.log('   Envía: {} (sin parámetros)');
  console.log('   Espera: { alumnos: Alumno[] }\n');
  
  return new Promise((resolve, reject) => {
    client.getAllAlumnos({}, (error, response) => {
      if (error) {
        console.error('Error en GetAllAlumnos:', error.message);
        reject(error);
      } else {
        console.log('Respuesta del servidor:');
        console.log(`   Cantidad de alumnos: ${response.alumnos.length}`);
        
        if (response.alumnos.length > 0) {
          console.log('\n   Lista de alumnos:');
          response.alumnos.forEach((alumno, index) => {
            console.log(`   ${index + 1}. ${alumno.name} ${alumno.lastname}`);
            console.log(`      Email: ${alumno.mail}`);
            console.log(`      ID: ${alumno.id}\n`);
          });
        } else {
          console.log('   (No hay alumnos registrados)');
        }
        resolve(response);
      }
    });
  });
}

/**
 * 3. Agregar alumno - AddAlumno
 * Llama a: servidor.addAlumno()
 * Envía: { name: string, lastname: string, mail: string }
 * Recibe: { alumno: Alumno, success: boolean, message: string }
 */
function agregarAlumno(name, lastname, mail) {
  console.log('\nEJECUTANDO: AddAlumno');
  console.log('   Llamada gRPC: client.addAlumno(request, callback)');
  console.log(`   Envía: { name: "${name}", lastname: "${lastname}", mail: "${mail}" }`);
  console.log('   Espera: { alumno: Alumno, success: boolean, message: string }\n');
  
  return new Promise((resolve, reject) => {
    const request = { name, lastname, mail };
    
    client.addAlumno(request, (error, response) => {
      if (error) {
        console.error('Error en AddAlumno:', error.message);
        reject(error);
      } else {
        console.log('Respuesta del servidor:');
        console.log(`   Éxito: ${response.success}`);
        console.log(`   Mensaje: ${response.message}`);
        
        if (response.success && response.alumno) {
          console.log('\n   Alumno creado:');
          console.log(`      Nombre: ${response.alumno.name} ${response.alumno.lastname}`);
          console.log(`      Email: ${response.alumno.mail}`);
          console.log(`      ID: ${response.alumno.id}`);
        }
        resolve(response);
      }
    });
  });
}

// ============ SISTEMA DE MENÚ INTERACTIVO ============

function mostrarMenu() {
  console.log('\n===============================================');
  console.log('CLIENTE gRPC INTERACTIVO');
  console.log('===============================================');
  console.log('Selecciona una opción:');
  console.log('');
  console.log('1. Contar alumnos       (GetAlumnoCount)');
  console.log('2. Listar alumnos       (GetAllAlumnos)');
  console.log('3. Agregar alumno       (AddAlumno)');
  console.log('4. Salir');
  console.log('');
  console.log('===============================================');
}

function preguntarOpcion() {
  return new Promise((resolve) => {
    rl.question('Ingresa tu opción (1-4): ', (respuesta) => {
      resolve(respuesta.trim());
    });
  });
}

function preguntarDatosAlumno() {
  return new Promise((resolve) => {
    console.log('\nDatos del nuevo alumno:');
    
    rl.question('   Nombre: ', (nombre) => {
      rl.question('   Apellido: ', (apellido) => {
        rl.question('   Email: ', (email) => {
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
