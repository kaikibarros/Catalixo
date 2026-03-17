#!/bin/bash
PORT=${PORT:-8000}

echo "Iniciando Mestre da Arena AI na porta $PORT..."
exec uvicorn src.backend.main:app --host 0.0.0.0 --port "$PORT"
