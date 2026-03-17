#!/bin/bash
PORT=${PORT:-10000}

echo "Iniciando Mestre da Arena AI na porta $PORT..."
export PYTHONPATH=$PYTHONPATH:/app/src
cd /app/src/backend
exec uvicorn main:app --host 0.0.0.0 --port "$PORT"
