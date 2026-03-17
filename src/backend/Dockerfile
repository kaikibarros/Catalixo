# Usar Python 3.12 slim
FROM python:3.12-slim

# Diretório de trabalho
WORKDIR /app

# Copiar requirements do backend
COPY src/backend/requirements.txt ./requirements.txt

# Instalar dependências
RUN pip install --no-cache-dir -r requirements.txt --extra-index-url https://download.pytorch.org/whl/cpu

# Copiar backend e services para o container
COPY src/backend ./backend
COPY src/services ./services

# Variável de ambiente para Python encontrar módulos
ENV PYTHONPATH=/app

# Dar permissão de execução ao start.sh
RUN chmod +x ./backend/start.sh

# Comando para iniciar o backend
CMD ["./backend/start.sh"]