const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
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

// ============ UTILIDADES PARA MOSTRAR RESULTADOS ============

/**
 * Imprime un separador visual en la consola
 */
function printSeparator(title) {
  console.log('\n' + '='.repeat(60));
  console.log(`${title}`);
  console.log('='.repeat(60));
}

/**
 * Imprime la información de un alumno de forma legible
 */
function printAlumno(alumno, index = null) {
  const prefix = index !== null ? `[${index + 1}] ` : '';
  console.log(`${prefix}${alumno.name} ${alumno.lastname}`);
  console.log(`   Email: ${alumno.mail}`);
  console.log(`   Teléfono: ${alumno.phone || 'No especificado'}`);
  console.log(`   Dirección: ${alumno.street}, ${alumno.city}`);
  console.log(`   ID: ${alumno.id}`);
}

/**
 * Imprime una lista de alumnos
 */
function printAlumnosList(alumnos, title = 'Lista de Alumnos') {
  console.log(`\n${title} (${alumnos.length} alumnos):`);
  if (alumnos.length === 0) {
    console.log('   (No hay alumnos registrados)');
  } else {
    alumnos.forEach((alumno, index) => {
      console.log(`\n${index + 1}. ${alumno.name} ${alumno.lastname}`);
      console.log(`   ${alumno.mail}`);
      console.log(`   ${alumno.phone || 'No especificado'}`);
      console.log(`   ${alumno.street}, ${alumno.city}`);
      console.log(`   ${alumno.id}`);
    });
  }
}

// ============ FUNCIONES DEL CLIENTE ============

/**
 * Función para consultar la cantidad de alumnos
 */
function consultarCantidadAlumnos(client) {
  return new Promise((resolve, reject) => {
    client.alumnoCount({}, (error, response) => {
      if (error) {
        console.error('Error al consultar cantidad:', error);
        reject(error);
      } else {
        console.log(`Cantidad total de alumnos: ${response.count}`);
        resolve(response);
      }
    });
  });
}

/**
 * Función para listar todos los alumnos
 */
function listarTodosLosAlumnos(client, title = 'Todos los Alumnos') {
  return new Promise((resolve, reject) => {
    client.allAlumnos({}, (error, response) => {
      if (error) {
        console.error('Error al listar alumnos:', error);
        reject(error);
      } else {
        printAlumnosList(response.alumnos, title);
        resolve(response);
      }
    });
  });
}

/**
 * Función para buscar un alumno por nombre
 */
function buscarAlumnoPorNombre(client, name) {
  return new Promise((resolve, reject) => {
    client.findAlumno({ name }, (error, response) => {
      if (error) {
        console.error('Error al buscar alumno:', error);
        reject(error);
      } else {
        console.log(`\nResultado de búsqueda para "${name}":`);
        if (response.found) {
          console.log(`${response.message}`);
          printAlumno(response.alumno);
        } else {
          console.log(`${response.message}`);
        }
        resolve(response);
      }
    });
  });
}

/**
 * Función para agregar un nuevo alumno
 */
function agregarAlumno(client, alumnoData) {
  return new Promise((resolve, reject) => {
    client.addAlumno(alumnoData, (error, response) => {
      if (error) {
        console.error('Error al agregar alumno:', error);
        reject(error);
      } else {
        console.log(`\nResultado de agregar alumno:`);
        if (response.success) {
          console.log(`${response.message}`);
          printAlumno(response.alumno);
        } else {
          console.log(`${response.message}`);
        }
        resolve(response);
      }
    });
  });
}

/**
 * Función para actualizar un alumno
 */
function actualizarAlumno(client, alumnoData) {
  return new Promise((resolve, reject) => {
    client.updateAlumno(alumnoData, (error, response) => {
      if (error) {
        console.error('Error al actualizar alumno:', error);
        reject(error);
      } else {
        console.log(`\nResultado de actualizar alumno:`);
        if (response.success) {
          console.log(`${response.message}`);
          printAlumno(response.alumno);
        } else {
          console.log(`${response.message}`);
        }
        resolve(response);
      }
    });
  });
}

/**
 * Función para eliminar un alumno
 */
function eliminarAlumno(client, id) {
  return new Promise((resolve, reject) => {
    client.deleteAlumno({ id }, (error, response) => {
      if (error) {
        console.error('Error al eliminar alumno:', error);
        reject(error);
      } else {
        console.log(`\nResultado de eliminar alumno:`);
        if (response.success) {
          console.log(`${response.message}`);
        } else {
          console.log(`${response.message}`);
        }
        resolve(response);
      }
    });
  });
}

// ============ FUNCIÓN PRINCIPAL DE DEMOSTRACIÓN ============

/**
 * Función principal que ejecuta todas las operaciones CRUD en orden
 */
async function ejecutarDemoCompleta() {
  // Crear cliente gRPC
  const client = new alumnoProto.AlumnoService(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  console.log('===============================================');
  console.log('CLIENTE gRPC - DEMO COMPLETA DE OPERACIONES');
  console.log('===============================================');
  console.log('Conectando al servidor en localhost:50051...\n');

  try {
    // 1. Mostrar cantidad inicial de alumnos
    printSeparator('1. CONSULTAR CANTIDAD DE ALUMNOS');
    await consultarCantidadAlumnos(client);

    // 2. Listar alumnos iniciales
    printSeparator('2. LISTAR ALUMNOS INICIALES');
    await listarTodosLosAlumnos(client, 'Estado Inicial');

    // 3. Agregar un nuevo alumno
    printSeparator('3. AGREGAR NUEVO ALUMNO');
    const nuevoAlumno = {
      name: 'Ana',
      lastname: 'Rodríguez',
      mail: 'ana.rodriguez@email.com',
      phone: '+54 11 5555-6666',
      street: 'Av. 9 de Julio 1500',
      city: 'Buenos Aires'
    };
    
    console.log('Datos del nuevo alumno a agregar:');
    console.log(`   Nombre: ${nuevoAlumno.name} ${nuevoAlumno.lastname}`);
    console.log(`   Email: ${nuevoAlumno.mail}`);
    console.log(`   Teléfono: ${nuevoAlumno.phone}`);
    console.log(`   Dirección: ${nuevoAlumno.street}, ${nuevoAlumno.city}`);
    
    const responseAdd = await agregarAlumno(client, nuevoAlumno);

    // 4. Buscar el alumno recién agregado por nombre
    printSeparator('4. BUSCAR ALUMNO POR NOMBRE');
    await buscarAlumnoPorNombre(client, 'Ana');

    // 5. Actualizar el alumno agregado (si se agregó exitosamente)
    if (responseAdd.success && responseAdd.alumno) {
      printSeparator('5. ACTUALIZAR ALUMNO EXISTENTE');
      const datosActualizados = {
        id: responseAdd.alumno.id,
        name: 'Ana María',
        lastname: 'Rodríguez González',
        mail: 'ana.rodriguez.gonzalez@email.com',
        phone: '+54 11 7777-8888',
        street: 'Av. Corrientes 2000',
        city: 'Buenos Aires'
      };
      
      console.log('Nuevos datos para actualizar:');
      console.log(`   Nombre: ${datosActualizados.name} ${datosActualizados.lastname}`);
      console.log(`   Email: ${datosActualizados.mail}`);
      console.log(`   Teléfono: ${datosActualizados.phone}`);
      console.log(`   Dirección: ${datosActualizados.street}, ${datosActualizados.city}`);
      
      await actualizarAlumno(client, datosActualizados);
    }

    // 6. Listar alumnos después de agregar y actualizar
    printSeparator('6. LISTAR ALUMNOS DESPUÉS DE MODIFICACIONES');
    await listarTodosLosAlumnos(client, 'Estado Después de Agregar y Actualizar');

    // 7. Eliminar el alumno agregado (si existe)
    if (responseAdd.success && responseAdd.alumno) {
      printSeparator('7. ELIMINAR ALUMNO');
      console.log(`Eliminando alumno con ID: ${responseAdd.alumno.id}`);
      await eliminarAlumno(client, responseAdd.alumno.id);
    }

    // 8. Listar alumnos finales para confirmar la eliminación
    printSeparator('8. ESTADO FINAL - LISTAR ALUMNOS');
    await listarTodosLosAlumnos(client, 'Estado Final');

    // 9. Consultar cantidad final
    printSeparator('9. CANTIDAD FINAL DE ALUMNOS');
    await consultarCantidadAlumnos(client);

    printSeparator('DEMO COMPLETADA EXITOSAMENTE');
    console.log('Todas las operaciones CRUD fueron ejecutadas correctamente');
    console.log('Operaciones realizadas:');
    console.log('   1. Consultar cantidad de alumnos');
    console.log('   2. Listar todos los alumnos');
    console.log('   3. Agregar nuevo alumno');
    console.log('   4. Buscar alumno por nombre');
    console.log('   5. Actualizar alumno existente');
    console.log('   6. Eliminar alumno');
    console.log('   7. Verificar estado final');
    console.log('\nPoC de gRPC completada para la cátedra de DSW');

  } catch (error) {
    console.error('\nERROR EN LA DEMOSTRACIÓN:', error);
    console.log('\nVerifica que el servidor esté ejecutándose en localhost:50051');
    console.log('Para iniciar el servidor: npm run start:server');
  } finally {
    // Cerrar conexión del cliente
    client.close();
    console.log('\nConexión del cliente cerrada');
  }
}

// ============ DEMOSTRACIÓN DE OPERACIONES INDIVIDUALES ============

/**
 * Función para probar operaciones individuales (opcional)
 */
async function pruebasIndividuales() {
  const client = new alumnoProto.AlumnoService(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );

  console.log('\nEJECUTANDO PRUEBAS INDIVIDUALES...\n');

  try {
    // Prueba de búsqueda con nombre que no existe
    console.log('Probando búsqueda con nombre inexistente:');
    await buscarAlumnoPorNombre(client, 'Pedro');

    // Prueba de agregar alumno con email duplicado
    console.log('\nProbando agregar alumno con email duplicado:');
    await agregarAlumno(client, {
      name: 'Juan Carlos',
      lastname: 'Pérez Duplicado',
      mail: 'juan.perez@email.com', // Este email ya existe
      phone: '+54 11 9999-0000',
      street: 'Calle Falsa 123',
      city: 'Springfield'
    });

    // Prueba de actualizar alumno inexistente
    console.log('\nProbando actualizar alumno inexistente:');
    await actualizarAlumno(client, {
      id: 'id-inexistente-12345',
      name: 'Nombre',
      lastname: 'Apellido',
      mail: 'test@email.com',
      phone: '',
      street: 'Calle Test',
      city: 'Ciudad Test'
    });

    // Prueba de eliminar alumno inexistente
    console.log('\nProbando eliminar alumno inexistente:');
    await eliminarAlumno(client, 'id-inexistente-67890');

  } catch (error) {
    console.error('Error en pruebas individuales:', error);
  } finally {
    client.close();
  }
}

// ============ PUNTO DE ENTRADA ============

if (require.main === module) {
  // Ejecutar demo completa
  ejecutarDemoCompleta()
    .then(() => {
      console.log('\n🏁 Cliente finalizado exitosamente');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Error fatal en el cliente:', error);
      process.exit(1);
    });

  // Descomentar la siguiente línea para ejecutar también las pruebas individuales
  // pruebasIndividuales();
}
