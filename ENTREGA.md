# INSTRUCCIONES DE ENTREGA - CÁTEDRA DSW

## Información del Proyecto

- **Cátedra**: Desarrollo de Software (DSW)
- **Tipo**: Prueba de Concepto (PoC)
- **Tecnología**: gRPC + Node.js
- **CRUD**: Alumnos (equivalente a la versión GraphQL)

## Lista de Verificación de Entrega

### Estructura del Proyecto
- [x] `proto/alumno.proto` - Definición del contrato gRPC
- [x] `server/server.js` - Implementación del servidor gRPC
- [x] `client/client.js` - Cliente con demostración completa
- [x] `package.json` - Dependencias y scripts de npm
- [x] `README.md` - Documentación completa
- [x] `.gitignore` - Archivos a ignorar en Git

### Operaciones CRUD Implementadas

#### Consultas (Queries)
- [x] **AlumnoCount**: Devuelve cantidad total de alumnos
- [x] **FindAlumno**: Busca alumno por nombre (búsqueda parcial)
- [x] **AllAlumnos**: Lista completa de alumnos

#### Mutaciones (Mutations)
- [x] **AddAlumno**: Agrega alumno con ID autogenerado
- [x] **UpdateAlumno**: Actualiza datos de alumno existente
- [x] **DeleteAlumno**: Elimina alumno por ID

### Características Técnicas
- [x] Datos en memoria (sin base de datos)
- [x] IDs autogenerados con UUID
- [x] Validación de emails únicos
- [x] Manejo de errores estructurado
- [x] Logs descriptivos en servidor
- [x] Cliente con demo completa y automática

### Documentación
- [x] README completo con instrucciones
- [x] Comentarios detallados en código
- [x] Ejemplos de salida esperada
- [x] Comparación con otras tecnologías
- [x] Solución de problemas comunes

## Cómo Probar la PoC

### Opción 1: Demo Automática (Windows)
```bash
npm install
npm run demo:windows
```

### Opción 2: Manual (Todas las plataformas)
```bash
# Terminal 1
npm install
npm run start:server

# Terminal 2 (después de que aparezca "Esperando conexiones de clientes...")
npm run start:client
```

## Datos de Prueba Incluidos

El servidor incluye 3 alumnos de prueba:

1. **Juan Pérez** - juan.perez@email.com
2. **María García** - maria.garcia@email.com  
3. **Carlos López** - carlos.lopez@email.com (sin teléfono)

## Operaciones Demostradas

La demo ejecuta automáticamente:

1. Consulta cantidad inicial (3 alumnos)
2. Lista alumnos iniciales
3. Agrega nuevo alumno (Ana Rodríguez)
4. Busca por nombre ("Ana")
5. Actualiza datos del alumno agregado
6. Lista alumnos después de modificaciones (4 alumnos)
7. Elimina el alumno agregado
8. Verifica estado final (3 alumnos)
9. Confirma cantidad final

## Ventajas de gRPC Demostradas

1. **Tipado Fuerte**: Protocol Buffers define contratos explícitos
2. **Rendimiento**: Serialización binaria vs JSON
3. **Generación de Código**: Stubs automáticos desde .proto
4. **HTTP/2**: Multiplexación y compresión
5. **Validación**: Errores estructurados con códigos específicos

## Comparación con GraphQL

| Aspecto | gRPC | GraphQL |
|---------|------|---------|
| **Protocolo** | HTTP/2 + Protobuf | HTTP + JSON |
| **Schema** | .proto files | SDL (Schema Definition Language) |
| **Queries** | RPCs específicos | Query language flexible |
| **Tipado** | Fuerte (compile-time) | Fuerte (runtime) |
| **Introspección** | Limitada | Completa |
| **Caching** | Limitado | Excelente |

## Objetivos Académicos Cumplidos

- **Demostración Práctica**: CRUD completo funcionando
- **Comparación**: Tabla comparativa con otras tecnologías
- **Facilidad de Uso**: Scripts automáticos y documentación clara
- **Código Educativo**: Comentarios detallados y estructura simple
- **Portabilidad**: Funciona en Windows, macOS y Linux

## Información de Contacto

- **Proyecto**: PoC gRPC - CRUD de Alumnos
- **Repositorio**: https://github.com/juaninavos/PoC-API-Grpc-Navos.Crocenzi-
- **Fecha**: 28 de agosto de 2025

---

**PoC completada y lista para presentación académica**
