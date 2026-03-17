#!/bin/bash
PORT=${PORT:-10000}

echo "Iniciando servidor na porta $PORT..."
export PYTHONPATH=$PYTHONPATH:/app/src
exec uvicorn backend.main:app --host 0.0.0.0 --port "$PORT"
