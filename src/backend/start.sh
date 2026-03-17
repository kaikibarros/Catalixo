#!/bin/bash

# Porta padrão (Render define via variável de ambiente PORT)
PORT=${PORT:-10000}

echo "Iniciando servidor na porta $PORT..."

# PYTHONPATH
export PYTHONPATH=/app

# Rodar uvicorn apontando para main.py dentro do backend
uvicorn backend.main:app --host 0.0.0.0 --port "$PORT"