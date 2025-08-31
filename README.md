# PoC gRPC - Cliente Interactivo para Alumnos

## Descripción

Esta es una **Prueba de Concepto (PoC) de gRPC** desarrollada para la cátedra de **Desarrollo de Software (DSW)**. 

El proyecto demuestra las características principales de gRPC con **3 operaciones esenciales** y un **cliente interactivo** que permite probar cada función individualmente.

## Objetivo

Entender las diferencias entre gRPC y otras tecnologías (REST, GraphQL) mediante un ejemplo práctico con **menú interactivo** para pruebas individuales.

## Estructura del Proyecto

```
grpc-alumno-poc/
├── proto/
│   └── alumno.proto          # Contrato gRPC (3 operaciones)
├── server/
│   └── server.js            # Servidor gRPC simplificado  
├── client/
│   └── client.js            # Cliente interactivo con menú
├── package.json             # Dependencias
└── README.md               # Esta documentación
```

## Operaciones gRPC Implementadas

### 1. **GetAlumnoCount** - Contar alumnos
```protobuf
rpc GetAlumnoCount(CountRequest) returns (CountResponse);
```
- **Envía**: `{}` (request vacío)
- **Recibe**: `{ count: number }`
- **Función**: Devuelve la cantidad total de alumnos

### 2. **GetAllAlumnos** - Listar alumnos
```protobuf
rpc GetAllAlumnos(GetAllRequest) returns (GetAllResponse);
```
- **Envía**: `{}` (request vacío)  
- **Recibe**: `{ alumnos: Alumno[] }`
- **Función**: Devuelve array con todos los alumnos

### 3. **AddAlumno** - Agregar alumno
```protobuf
rpc AddAlumno(AddAlumnoRequest) returns (AddAlumnoResponse);
```
- **Envía**: `{ name: string, lastname: string, mail: string }`
- **Recibe**: `{ alumno: Alumno, success: boolean, message: string }`
- **Función**: Agrega un nuevo alumno con validación de email único

## Modelo de Datos

```protobuf
message Alumno {
  string id = 1;       // UUID autogenerado
  string name = 2;     // Nombre
  string lastname = 3; // Apellido  
  string mail = 4;     // Email (único)
}
```

## Instalación y Ejecución

### Prerequisitos
- **Node.js** >= 14.0.0
- **npm**

### Método Recomendado: Dos Terminales en VS Code

#### **Paso 1: Instalar dependencias**
```bash
npm install
```

#### **Paso 2: Abrir primera terminal en VS Code**
- Presiona `Ctrl + `` (backtick) para abrir terminal integrada
- O ve a: **Terminal** > **New Terminal**

#### **Paso 3: Ejecutar servidor**
```bash
npm run start:server
```

#### **Paso 4: Abrir segunda terminal en VS Code**
- Haz clic en el **"+"** en el panel de terminal
- O presiona `Ctrl + Shift + `` 
- Verás dos pestañas de terminal

#### **Paso 5: Ejecutar cliente**
```bash
npm run start:client
```

### Scripts Disponibles

```bash
# Scripts básicos
npm run start:server    # Inicia servidor gRPC
npm run start:client    # Inicia cliente interactivo

# Scripts con información adicional
npm run dev:server      # Servidor con mensaje de terminal
npm run dev:client      # Cliente con mensaje de terminal
```

### Guía Visual Rápida

```
VS Code - Configuración de Terminales
=====================================

[Terminal Panel - Vista Inferior]
┌─────────────────────────────────────────────┐
│ [powershell ▼] [bash ▼] [+] [⚮] [🗑]        │
├─────────────────────────────────────────────┤
│ Terminal 1: SERVIDOR                        │
│ > npm run start:server                      │
│ SERVIDOR LISTO - Esperando conexiones...   │
├─────────────────────────────────────────────┤
│ Terminal 2: CLIENTE                         │
│ > npm run start:client                      │
│ CLIENTE gRPC INTERACTIVO                    │
│ Ingresa tu opción (1-4):                    │
└─────────────────────────────────────────────┘

Atajos útiles:
• Ctrl + `          : Abrir/cerrar panel terminal
• Ctrl + Shift + `  : Nueva terminal
• Ctrl + C          : Parar proceso actual
```

### Flujo de Trabajo Recomendado

```bash
# Paso 1: Preparar entorno
npm install

# Paso 2: Terminal 1 (Servidor)
npm run dev:server    # Con mensajes informativos
# O
npm run start:server  # Versión limpia

# Paso 3: Terminal 2 (Cliente) 
npm run dev:client    # Con mensajes informativos
# O  
npm run start:client  # Versión limpia

# Paso 4: Probar operaciones
# Usa el menú interactivo en Terminal 2
# Ve los logs del servidor en Terminal 1
```

## Cliente Interactivo

El nuevo cliente permite probar cada operación gRPC de forma individual:

```
===============================================
CLIENTE gRPC INTERACTIVO
===============================================
Selecciona una opción:

1. Contar alumnos       (GetAlumnoCount)
2. Listar alumnos       (GetAllAlumnos)
3. Agregar alumno       (AddAlumno)
4. Salir

===============================================
Ingresa tu opción (1-4):
```

### Qué Hace Cada Opción

#### **Opción 1: Contar Alumnos**
```
EJECUTANDO: GetAlumnoCount
   Llamada gRPC: client.getAlumnoCount({}, callback)
   Envía: {} (sin parámetros)
   Espera: { count: number }

Respuesta del servidor:
   Total de alumnos: 2
```

#### **Opción 2: Listar Alumnos**  
```
EJECUTANDO: GetAllAlumnos
   Llamada gRPC: client.getAllAlumnos({}, callback)
   Envía: {} (sin parámetros)
   Espera: { alumnos: Alumno[] }

Respuesta del servidor:
   Cantidad de alumnos: 2

   Lista de alumnos:
   1. Juan Pérez
      Email: juan.perez@email.com
      ID: 550e8400-e29b-41d4-a716-446655440000

   2. María García
      Email: maria.garcia@email.com
      ID: 550e8400-e29b-41d4-a716-446655440001
```

#### **Opción 3: Agregar Alumno**
```
Datos del nuevo alumno:
   Nombre: Ana
   Apellido: López
   Email: ana.lopez@email.com

EJECUTANDO: AddAlumno
   Llamada gRPC: client.addAlumno(request, callback)
   Envía: { name: "Ana", lastname: "López", mail: "ana.lopez@email.com" }
   Espera: { alumno: Alumno, success: boolean, message: string }

Respuesta del servidor:
   Éxito: true
   Mensaje: Alumno Ana López agregado exitosamente

   Alumno creado:
      Nombre: Ana López
      Email: ana.lopez@email.com
      ID: 550e8400-e29b-41d4-a716-446655440003
```

## Diferencias con REST

| Aspecto | REST | gRPC |
|---------|------|------|
| **Pruebas** | Navegador, Postman, curl | Cliente específico requerido |
| **Protocolo** | HTTP + JSON | HTTP/2 + Protobuf |
| **Formato** | Texto (JSON) | Binario (Protobuf) |
| **Tipado** | Débil | Fuerte (.proto) |
| **Rendimiento** | Medio | Alto |
| **Herramientas** | Muchas | Específicas |

## Ventajas del Cliente Interactivo

1. **Pruebas Individuales**: Ejecuta una operación a la vez
2. **Detalles Técnicos**: Muestra exactamente qué se envía y recibe
3. **Debugging Fácil**: Ve errores específicos de cada llamada
4. **Sin Código**: No necesitas programar para probar
5. **Reutilizable**: Puedes repetir operaciones sin reiniciar

## Características Técnicas Demostradas

### **Protocol Buffers (.proto)**
- Contratos fuertemente tipados
- Validación automática de tipos
- Serialización binaria eficiente

### **Comunicación gRPC**
- Llamadas RPC síncronas
- Manejo estructurado de errores
- Respuestas tipadas garantizadas

### **Cliente Node.js**
- Conexión persistente al servidor
- Callbacks asíncronos
- Manejo de errores gRPC

## Dependencias

- `@grpc/grpc-js`: Cliente y servidor gRPC para Node.js
- `@grpc/proto-loader`: Carga dinámica de archivos .proto
- `uuid`: Generación de IDs únicos
- `readline`: Interfaz interactiva de consola

## Solución de Problemas

### Problemas con Terminales en VS Code

#### **No aparece segunda terminal**
```bash
# Solución:
1. Ctrl + Shift + ` para nueva terminal
2. O haz clic en "+" en el panel de terminal
3. Verifica que tengas dos pestañas en el panel inferior
```

#### **El servidor no para cuando cierro VS Code**
```bash
# Solución:
1. Ve a la terminal del servidor
2. Presiona Ctrl + C para parar el servidor
3. O cierra la terminal específica
```

#### **No puedo alternar entre terminales**
```bash
# Solución:
1. Haz clic en las pestañas del panel de terminal
2. O usa el dropdown en el panel de terminal
3. Cada terminal mantiene su propio proceso
```

### Errores de Conexión

#### **Error: "Connection refused"**
```bash
No se pudo conectar al servidor
Asegúrate de ejecutar primero: npm run start:server
```

#### **Error: "Module not found"**
```bash
# Solución: Instalar dependencias
npm install
```

#### **Puerto ocupado**
```bash
# Cambiar puerto en server/server.js línea 87:
const serverAddress = '0.0.0.0:NUEVO_PUERTO';
```

## Referencias

- [Documentación oficial de gRPC](https://grpc.io/docs/)
- [Protocol Buffers](https://developers.google.com/protocol-buffers)
- [gRPC para Node.js](https://grpc.github.io/grpc/node/)

---

**Desarrollado para la cátedra de Desarrollo de Software (DSW)**
