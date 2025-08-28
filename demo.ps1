# Script PowerShell para ejecutar la demo de gRPC
Write-Host "🚀 INICIANDO DEMO COMPLETA DE gRPC" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

Write-Host "📡 Paso 1: Iniciando servidor gRPC en segundo plano..." -ForegroundColor Yellow

# Iniciar el servidor en un proceso separado
$serverJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    node server/server.js
}

Write-Host "⏰ Esperando 5 segundos para que el servidor se inicialice..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "📋 Paso 2: Ejecutando cliente para demostrar operaciones CRUD..." -ForegroundColor Yellow
Write-Host ""

# Ejecutar el cliente
node client/client.js

Write-Host ""
Write-Host "🛑 Cerrando servidor..." -ForegroundColor Red
Stop-Job $serverJob
Remove-Job $serverJob

Write-Host "✅ Demo completada exitosamente." -ForegroundColor Green
