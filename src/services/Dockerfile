FROM python:3.12-slim
WORKDIR /app
COPY . .
ENV PYTHONPATH=/app

# Comando para rodar o main.py da pasta services
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]