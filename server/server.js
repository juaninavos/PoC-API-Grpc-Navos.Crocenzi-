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

// Base de datos simple en memoria
let alumnos = [
  {
    id: uuidv4(),
    name: 'Juan',
    lastname: 'Pérez',
    mail: 'juan.perez@email.com'
  },
  {
    id: uuidv4(),
    name: 'María',
    lastname: 'García',
    mail: 'maria.garcia@email.com'
  }
];

// ============ IMPLEMENTACIÓN ============

/**
 * Obtener cantidad de alumnos
 */
function getAlumnoCount(call, callback) {
  callback(null, {
    count: alumnos.length
  });
}

/**
 * Obtener todos los alumnos
 */
function getAllAlumnos(call, callback) {
  callback(null, {
    alumnos: alumnos
  });
}

/**
 * Agregar nuevo alumno
 */
function addAlumno(call, callback) {
  const { name, lastname, mail } = call.request;
  
  // Validación: verificar email único
  const existingAlumno = alumnos.find(a => a.mail === mail);
  if (existingAlumno) {
    callback(null, {
      alumno: null,
      success: false,
      message: `Email ${mail} ya registrado`
    });
    return;
  }
  
  // Crear y agregar nuevo alumno
  const nuevoAlumno = {
    id: uuidv4(),
    name,
    lastname,
    mail
  };
  
  alumnos.push(nuevoAlumno);
  
  callback(null, {
    alumno: nuevoAlumno,
    success: true,
    message: `Alumno agregado: ${name} ${lastname}`
  });
}

// ============ CONFIGURACIÓN ============

function main() {
  const server = new grpc.Server();
  
  // Registrar operaciones
  server.addService(alumnoProto.AlumnoService.service, {
    getAlumnoCount: getAlumnoCount,
    getAllAlumnos: getAllAlumnos,
    addAlumno: addAlumno
  });
  
  const serverAddress = '0.0.0.0:50051';
  
  server.bindAsync(
    serverAddress,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error('Error al iniciar servidor:', err);
        return;
      }
      
      console.log('Servidor gRPC iniciado en:', serverAddress);
      console.log('Alumnos iniciales:', alumnos.length);
      console.log('');
      console.log('Para probar:');
      console.log('  1. Nueva terminal (Ctrl+Shift+`)');
      console.log('  2. npm run start:client');
      
      server.start();
      
      // Manejo de cierre
      process.on('SIGTERM', () => {
        console.log('\nCerrando servidor...');
        process.exit(0);
      });

      process.on('SIGINT', () => {
        console.log('\nCerrando servidor...');
        process.exit(0);
      });
    }
  );
}

// Iniciar servidor
if (require.main === module) {
  main();
}
