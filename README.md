# 🎓 PoC gRPC - CRUD de Alumnos

## 📋 Descripción

Esta es una **Prueba de Concepto (PoC)** de **gRPC** desarrollada para la cátedra de **Desarrollo de Software (DSW)**. 

El proyecto implementa un CRUD completo de alumnos utilizando **Node.js** y **gRPC**, demostrando las características principales de esta tecnología de comunicación moderna.

## 🎯 Objetivos Académicos

- Demostrar el uso práctico de gRPC para operaciones CRUD
- Comparar gRPC con otras tecnologías de API (GraphQL, REST, JSON-RPC, tRPC)
- Mostrar las ventajas de Protocol Buffers (.proto) para definir contratos
- Implementar cliente y servidor gRPC funcionales
- Mantener los datos en memoria para simplificar la demostración

## 🏗️ Estructura del Proyecto

```
grpc-alumno-poc/
├── proto/
│   └── alumno.proto          # Definición del contrato gRPC
├── server/
│   └── server.js            # Implementación del servidor gRPC
├── client/
│   └── client.js            # Cliente gRPC con demos completas
├── package.json             # Dependencias y scripts
└── README.md               # Este archivo
```

## 📊 Modelo de Datos - Alumno

Cada alumno tiene los siguientes campos:

- **id** (string): UUID autogenerado
- **name** (string): Nombre del alumno
- **lastname** (string): Apellido del alumno
- **mail** (string): Email del alumno (único)
- **phone** (string): Teléfono (opcional)
- **street** (string): Dirección - Calle
- **city** (string): Dirección - Ciudad

## 🔧 Operaciones Implementadas

### 📖 Consultas (Queries)
- **AlumnoCount**: Devuelve la cantidad total de alumnos
- **FindAlumno**: Busca un alumno por nombre (búsqueda parcial)
- **AllAlumnos**: Devuelve la lista completa de alumnos

### ✏️ Mutaciones (Mutations)
- **AddAlumno**: Agrega un nuevo alumno con ID autogenerado
- **UpdateAlumno**: Actualiza los datos de un alumno existente
- **DeleteAlumno**: Elimina un alumno por ID

## 🚀 Instalación y Configuración

### Prerequisitos

- **Node.js** >= 14.0.0
- **npm** o **yarn**

### 1. Instalar Dependencias

```bash
# Instalar todas las dependencias necesarias
npm install
```

### 2. Dependencias Principales

- `@grpc/grpc-js`: Cliente y servidor gRPC para Node.js
- `@grpc/proto-loader`: Cargador dinámico de archivos .proto
- `uuid`: Generación de UUIDs para IDs únicos

## ▶️ Ejecutar la PoC

### ✅ Método Recomendado: Dos Terminales

**Terminal 1 - Servidor:**
```bash
npm run start:server
```

**Terminal 2 - Cliente (después de que aparezca "Esperando conexiones de clientes..."):**
```bash
npm run start:client
```

### 🚀 Método Automático en Windows

Para una demostración automática, ejecuta:
```bash
npm run demo:windows
```

### 🔧 Método Manual

```bash
# Terminal 1 - Servidor
node server/server.js

# Terminal 2 - Cliente (después de que el servidor esté corriendo)
node client/client.js
```

### 💡 En VSCode

1. **Abre la Terminal integrada** (Ctrl+` o View > Terminal)
2. **Ejecuta el servidor:**
   ```bash
   npm run start:server
   ```
3. **Abre una nueva terminal** (botón "+" en el panel de terminal)
4. **Ejecuta el cliente:**
   ```bash
   npm run start:client
   ```

## 🔍 ¿Qué Hace la Demo?

El cliente ejecuta automáticamente todas las operaciones CRUD en el siguiente orden:

1. **📊 Consultar cantidad inicial** de alumnos
2. **📋 Listar alumnos iniciales** (datos de prueba)
3. **➕ Agregar nuevo alumno** (Ana Rodríguez)
4. **🔍 Buscar alumno por nombre** ("Ana")
5. **✏️ Actualizar datos** del alumno agregado
6. **📋 Listar alumnos** después de modificaciones
7. **🗑️ Eliminar** el alumno agregado
8. **📋 Verificar estado final** de la lista
9. **📊 Consultar cantidad final** de alumnos

## 📝 Ejemplo de Salida Esperada

```
🚀 ===============================================
🚀 CLIENTE gRPC - DEMO COMPLETA DE OPERACIONES
🚀 ===============================================
📡 Conectando al servidor en localhost:50051...

============================================================
🎯 1. CONSULTAR CANTIDAD DE ALUMNOS
============================================================
📊 Cantidad total de alumnos: 3

============================================================
🎯 2. LISTAR ALUMNOS INICIALES
============================================================

📋 Estado Inicial (3 alumnos):

1. Juan Pérez
   📧 juan.perez@email.com
   📱 +54 11 1234-5678
   🏠 Av. Corrientes 1234, Buenos Aires
   🆔 550e8400-e29b-41d4-a716-446655440000

2. María García
   📧 maria.garcia@email.com
   📱 +54 11 8765-4321
   🏠 Calle San Martín 567, Córdoba
   🆔 550e8400-e29b-41d4-a716-446655440001

3. Carlos López
   📧 carlos.lopez@email.com
   📱 No especificado
   🏠 Av. Rivadavia 890, Rosario
   🆔 550e8400-e29b-41d4-a716-446655440002

============================================================
🎯 3. AGREGAR NUEVO ALUMNO
============================================================
📝 Datos del nuevo alumno a agregar:
   Nombre: Ana Rodríguez
   Email: ana.rodriguez@email.com
   Teléfono: +54 11 5555-6666
   Dirección: Av. 9 de Julio 1500, Buenos Aires

➕ Resultado de agregar alumno:
✅ Alumno Ana Rodríguez agregado exitosamente
🎓 Ana Rodríguez
   📧 Email: ana.rodriguez@email.com
   📱 Teléfono: +54 11 5555-6666
   🏠 Dirección: Av. 9 de Julio 1500, Buenos Aires
   🆔 ID: 550e8400-e29b-41d4-a716-446655440003

[... resto de operaciones ...]
```

## 🛠️ Características Técnicas de gRPC Demostradas

### 1. **Protocol Buffers (.proto)**
- Definición de contratos fuertemente tipados
- Generación automática de código cliente/servidor
- Serialización binaria eficiente

### 2. **Comunicación Bidireccional**
- Llamadas RPC síncronas
- Manejo de errores estructurado
- Respuestas tipadas

### 3. **Servicios Estructurados**
- Separación clara entre consultas y mutaciones
- Reutilización de tipos de datos
- Versionado de APIs

### 4. **Rendimiento**
- Comunicación binaria (más rápida que JSON)
- HTTP/2 como protocolo base
- Multiplexación de conexiones

## 🔧 Personalización y Extensión

### Modificar Datos Iniciales

Edita el array `alumnos` en `server/server.js`:

```javascript
let alumnos = [
  {
    id: uuidv4(),
    name: 'Tu Nombre',
    lastname: 'Tu Apellido',
    mail: 'tu.email@email.com',
    phone: '+54 11 1234-5678',
    street: 'Tu Dirección',
    city: 'Tu Ciudad'
  }
  // ... más alumnos
];
```

### Agregar Nuevas Operaciones

1. **Actualizar `proto/alumno.proto`** con el nuevo servicio
2. **Implementar en `server/server.js`** la lógica del servidor
3. **Usar en `client/client.js`** para probar la nueva funcionalidad

### Cambiar Puerto del Servidor

Modifica la constante en `server/server.js`:

```javascript
const serverAddress = '0.0.0.0:TU_PUERTO';
```

Y en `client/client.js`:

```javascript
const client = new alumnoProto.AlumnoService(
  'localhost:TU_PUERTO',
  grpc.credentials.createInsecure()
);
```

## 🐛 Solución de Problemas

### Error: "Connection refused"
- **Causa**: El servidor no está corriendo
- **Solución**: Ejecutar `npm run start:server` primero

### Error: "Module not found"
- **Causa**: Dependencias no instaladas
- **Solución**: Ejecutar `npm install`

### Error: "Port already in use"
- **Causa**: Otro proceso está usando el puerto 50051
- **Solución**: Cambiar el puerto o cerrar el proceso

### El cliente no muestra resultados
- **Causa**: Problema de conexión de red
- **Solución**: Verificar firewall y configuración de red

## 📚 Conceptos de gRPC Aplicados

### 1. **Definición de Servicios**
```protobuf
service AlumnoService {
  rpc AddAlumno(AddAlumnoRequest) returns (AddAlumnoResponse);
  rpc FindAlumno(FindAlumnoRequest) returns (FindAlumnoResponse);
  // ... más operaciones
}
```

### 2. **Mensajes Estructurados**
```protobuf
message Alumno {
  string id = 1;
  string name = 2;
  string lastname = 3;
  // ... más campos
}
```

### 3. **Llamadas RPC**
```javascript
client.addAlumno(request, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Éxito:', response);
  }
});
```

## 🎯 Comparación con Otras Tecnologías

| Característica | gRPC | GraphQL | REST | JSON-RPC |
|----------------|------|---------|------|----------|
| **Protocolo** | HTTP/2 + Protobuf | HTTP + JSON | HTTP + JSON | HTTP + JSON |
| **Tipado** | ✅ Fuerte | ✅ Fuerte | ❌ Débil | ❌ Débil |
| **Rendimiento** | ✅ Muy Alto | 🔶 Medio | 🔶 Medio | 🔶 Medio |
| **Curva de Aprendizaje** | 🔶 Moderada | 🔶 Moderada | ✅ Baja | ✅ Baja |
| **Herramientas** | ✅ Excelentes | ✅ Excelentes | ✅ Buenas | 🔶 Limitadas |

## 📖 Referencias y Documentación

- [Documentación oficial de gRPC](https://grpc.io/docs/)
- [Protocol Buffers](https://developers.google.com/protocol-buffers)
- [gRPC para Node.js](https://grpc.github.io/grpc/node/)
- [Comparación de tecnologías de API](https://blog.logrocket.com/comparing-api-architectures-rest-graphql-grpc/)

## 👥 Información del Proyecto

- **Cátedra**: Desarrollo de Software (DSW)
- **Tecnología**: gRPC + Node.js
- **Objetivo**: Prueba de Concepto académica
- **Estado**: ✅ Completado y funcional

## 📞 Contacto y Soporte

Para preguntas sobre esta PoC, contacta a tu equipo de desarrollo o consulta la documentación de la cátedra.

---

**🎓 Desarrollado para la cátedra de Desarrollo de Software (DSW)**
