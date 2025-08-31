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

// ============ IMPLEMENTACIÓN SIMPLIFICADA ============

/**
 * 1. Obtener cantidad de alumnos
 */
function getAlumnoCount(call, callback) {
  console.log('Consultando cantidad de alumnos...');
  
  callback(null, {
    count: alumnos.length
  });
}

/**
 * 2. Obtener todos los alumnos
 */
function getAllAlumnos(call, callback) {
  console.log('Obteniendo lista de alumnos...');
  
  callback(null, {
    alumnos: alumnos
  });
}

/**
 * 3. Agregar nuevo alumno
 */
function addAlumno(call, callback) {
  const { name, lastname, mail } = call.request;
  console.log(`Agregando alumno: ${name} ${lastname}`);
  
  // Validación simple: verificar email único
  const existingAlumno = alumnos.find(a => a.mail === mail);
  if (existingAlumno) {
    callback(null, {
      alumno: null,
      success: false,
      message: `El email ${mail} ya está registrado`
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
    message: `Alumno ${name} ${lastname} agregado exitosamente`
  });
}

// ============ CONFIGURACIÓN DEL SERVIDOR ============

function main() {
  const server = new grpc.Server();
  
  // Registrar solo las 3 operaciones esenciales
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
        console.error('Error al iniciar el servidor:', err);
        return;
      }
      
      console.log('===============================================');
      console.log('SERVIDOR gRPC SIMPLIFICADO INICIADO');
      console.log('===============================================');
      console.log(`Escuchando en: ${serverAddress}`);
      console.log(`Alumnos iniciales: ${alumnos.length}`);
      console.log('Operaciones disponibles:');
      console.log('  1. GetAlumnoCount - Contar alumnos');
      console.log('  2. GetAllAlumnos - Listar alumnos');
      console.log('  3. AddAlumno - Agregar alumno');
      console.log('===============================================');
      console.log('SERVIDOR LISTO - Esperando conexiones...');
      console.log('');
      console.log('Para probar:');
      console.log('  1. Abre NUEVA TERMINAL en VS Code (Ctrl+Shift+`)');
      console.log('  2. Ejecuta: npm run start:client');
      console.log('===============================================');
      
      server.start();
      
      // Manejo de cierre del servidor
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
