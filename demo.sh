#!/bin/bash

echo "🚀 INICIANDO DEMO COMPLETA DE gRPC"
echo "================================"
echo ""

echo "📡 Paso 1: Iniciando servidor gRPC en segundo plano..."
node server/server.js &
SERVER_PID=$!

echo "⏰ Esperando 3 segundos para que el servidor se inicialice..."
sleep 3

echo "📋 Paso 2: Ejecutando cliente para demostrar operaciones CRUD..."
echo ""
node client/client.js

echo ""
echo "🛑 Cerrando servidor..."
kill $SERVER_PID

echo "✅ Demo completada exitosamente."
