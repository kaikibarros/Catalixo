# Usar Python 3.12 slim
FROM python:3.12-slim
WORKDIR /app
COPY src/backend/requirements.txt ./requirements.txt

# Instalar dependências
RUN pip install --no-cache-dir -r requirements.txt --extra-index-url https://download.pytorch.org/whl/cpu

COPY src/backend ./backend
COPY src/services ./services

ENV PYTHONPATH=/app

RUN chmod +x ./backend/start.sh

CMD ["./backend/start.sh"]