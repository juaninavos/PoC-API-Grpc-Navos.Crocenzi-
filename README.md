# PoC gRPC - Cliente Interactivo para Alumnos

## Descripción

Prueba de Concepto (PoC) de gRPC para la cátedra de **Desarrollo de Software (DSW)**. 

Demuestra las características principales de gRPC con **3 operaciones esenciales**.

## Objetivo

Comparar gRPC con otras tecnologías (REST, GraphQL) mediante un ejemplo práctico.


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
