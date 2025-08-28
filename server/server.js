const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

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

// Base de datos en memoria - Lista de alumnos
let alumnos = [
  {
    id: uuidv4(),
    name: 'Juan',
    lastname: 'Pérez',
    mail: 'juan.perez@email.com',
    phone: '+54 11 1234-5678',
    street: 'Av. Corrientes 1234',
    city: 'Buenos Aires'
  },
  {
    id: uuidv4(),
    name: 'María',
    lastname: 'García',
    mail: 'maria.garcia@email.com',
    phone: '+54 11 8765-4321',
    street: 'Calle San Martín 567',
    city: 'Córdoba'
  },
  {
    id: uuidv4(),
    name: 'Carlos',
    lastname: 'López',
    mail: 'carlos.lopez@email.com',
    phone: '', // Teléfono opcional vacío
    street: 'Av. Rivadavia 890',
    city: 'Rosario'
  }
];

// ============ IMPLEMENTACIÓN DE SERVICIOS ============

/**
 * Devuelve la cantidad total de alumnos
 */
function alumnoCount(call, callback) {
  console.log('Consultando cantidad de alumnos...');
  
  const response = {
    count: alumnos.length
  };
  
  console.log(`Cantidad de alumnos: ${response.count}`);
  callback(null, response);
}

/**
 * Busca un alumno por nombre
 */
function findAlumno(call, callback) {
  const { name } = call.request;
  console.log(`Buscando alumno por nombre: "${name}"`);
  
  // Búsqueda case-insensitive
  const alumno = alumnos.find(a => 
    a.name.toLowerCase().includes(name.toLowerCase())
  );
  
  if (alumno) {
    console.log(`Alumno encontrado: ${alumno.name} ${alumno.lastname}`);
    callback(null, {
      alumno: alumno,
      found: true,
      message: `Alumno encontrado: ${alumno.name} ${alumno.lastname}`
    });
  } else {
    console.log(`Alumno no encontrado con nombre: "${name}"`);
    callback(null, {
      alumno: null,
      found: false,
      message: `No se encontró ningún alumno con el nombre: "${name}"`
    });
  }
}

/**
 * Devuelve todos los alumnos
 */
function allAlumnos(call, callback) {
  console.log('Obteniendo lista completa de alumnos...');
  
  const response = {
    alumnos: alumnos
  };
  
  console.log(`Se encontraron ${alumnos.length} alumnos`);
  callback(null, response);
}

/**
 * Agrega un nuevo alumno con ID autogenerado
 */
function addAlumno(call, callback) {
  const { name, lastname, mail, phone, street, city } = call.request;
  console.log(`Agregando nuevo alumno: ${name} ${lastname}`);
  
  // Verificar si ya existe un alumno con el mismo email
  const existingAlumno = alumnos.find(a => a.mail === mail);
  if (existingAlumno) {
    console.log(`Error: Ya existe un alumno con el email: ${mail}`);
    callback(null, {
      alumno: null,
      success: false,
      message: `Ya existe un alumno registrado con el email: ${mail}`
    });
    return;
  }
  
  // Crear nuevo alumno con ID autogenerado
  const nuevoAlumno = {
    id: uuidv4(),
    name,
    lastname,
    mail,
    phone: phone || '', // Si no se proporciona teléfono, se asigna string vacío
    street,
    city
  };
  
  // Agregar a la lista
  alumnos.push(nuevoAlumno);
  
  console.log(`Alumno agregado exitosamente con ID: ${nuevoAlumno.id}`);
  callback(null, {
    alumno: nuevoAlumno,
    success: true,
    message: `Alumno ${name} ${lastname} agregado exitosamente`
  });
}

/**
 * Actualiza los datos de un alumno existente
 */
function updateAlumno(call, callback) {
  const { id, name, lastname, mail, phone, street, city } = call.request;
  console.log(`Actualizando alumno con ID: ${id}`);
  
  // Buscar el alumno por ID
  const alumnoIndex = alumnos.findIndex(a => a.id === id);
  
  if (alumnoIndex === -1) {
    console.log(`Error: No se encontró alumno con ID: ${id}`);
    callback(null, {
      alumno: null,
      success: false,
      message: `No se encontró ningún alumno con el ID: ${id}`
    });
    return;
  }
  
  // Verificar si el nuevo email ya está en uso por otro alumno
  const emailInUse = alumnos.find(a => a.mail === mail && a.id !== id);
  if (emailInUse) {
    console.log(`Error: El email ${mail} ya está en uso por otro alumno`);
    callback(null, {
      alumno: null,
      success: false,
      message: `El email ${mail} ya está siendo utilizado por otro alumno`
    });
    return;
  }
  
  // Actualizar los datos del alumno
  alumnos[alumnoIndex] = {
    id, // Mantener el mismo ID
    name,
    lastname,
    mail,
    phone: phone || '', // Si no se proporciona teléfono, se asigna string vacío
    street,
    city
  };
  
  console.log(`Alumno actualizado exitosamente: ${name} ${lastname}`);
  callback(null, {
    alumno: alumnos[alumnoIndex],
    success: true,
    message: `Alumno ${name} ${lastname} actualizado exitosamente`
  });
}

/**
 * Elimina un alumno por ID
 */
function deleteAlumno(call, callback) {
  const { id } = call.request;
  console.log(`Eliminando alumno con ID: ${id}`);
  
  // Buscar el alumno por ID
  const alumnoIndex = alumnos.findIndex(a => a.id === id);
  
  if (alumnoIndex === -1) {
    console.log(`Error: No se encontró alumno con ID: ${id}`);
    callback(null, {
      success: false,
      message: `No se encontró ningún alumno con el ID: ${id}`
    });
    return;
  }
  
  // Eliminar el alumno
  const alumnoEliminado = alumnos.splice(alumnoIndex, 1)[0];
  
  console.log(`Alumno eliminado: ${alumnoEliminado.name} ${alumnoEliminado.lastname}`);
  callback(null, {
    success: true,
    message: `Alumno ${alumnoEliminado.name} ${alumnoEliminado.lastname} eliminado exitosamente`
  });
}

// ============ CONFIGURACIÓN DEL SERVIDOR ============

/**
 * Función principal para iniciar el servidor gRPC
 */
function main() {
  const server = new grpc.Server();
  
  // Registrar el servicio con sus implementaciones
  server.addService(alumnoProto.AlumnoService.service, {
    alumnoCount: alumnoCount,
    findAlumno: findAlumno,
    allAlumnos: allAlumnos,
    addAlumno: addAlumno,
    updateAlumno: updateAlumno,
    deleteAlumno: deleteAlumno,
  });
  
  // Configurar la dirección y puerto del servidor
  const serverAddress = '0.0.0.0:50051';
  
  server.bindAsync(
    serverAddress,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error('Error al iniciar el servidor:', err);
        return;
      }
      
      console.log('===============================================');
      console.log('SERVIDOR gRPC INICIADO EXITOSAMENTE');
      console.log('===============================================');
      console.log(`Escuchando en: ${serverAddress}`);
      console.log(`Servicio: AlumnoService`);
      console.log(`Alumnos iniciales en memoria: ${alumnos.length}`);
      console.log('===============================================');
      console.log('Esperando conexiones de clientes...\n');
      
      server.start();
    }
  );
}

// Manejo de cierre graceful del servidor
process.on('SIGTERM', () => {
  console.log('\nCerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nCerrando servidor...');
  process.exit(0);
});

// Iniciar el servidor
if (require.main === module) {
  main();
}
