#!/bin/bash
PORT=${PORT:-8000}

echo "Iniciando Mestre da Arena AI na porta $PORT..."
exec uvicorn backend.main:app --host 0.0.0.0 --port "$PORT"
export PYTHONPATH=$PYTHONPATH:$(pwd)/src
