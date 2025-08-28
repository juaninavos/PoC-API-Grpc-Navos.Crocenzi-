@echo off
echo 🚀 INICIANDO DEMO COMPLETA DE gRPC
echo ================================
echo.
echo 📡 Paso 1: Iniciando servidor gRPC...
start "Servidor gRPC" cmd /k "cd /d \"%~dp0\" && node server/server.js"

echo ⏰ Esperando 3 segundos para que el servidor se inicialice...
timeout /t 3 /nobreak >nul

echo 📋 Paso 2: Ejecutando cliente para demostrar operaciones CRUD...
echo.
node client/client.js

echo.
echo ✅ Demo completada. 
echo 💡 El servidor sigue corriendo en la ventana separada.
echo 💡 Cierra la ventana del servidor cuando termines.
pause
