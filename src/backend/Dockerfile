FROM python:3.12-slim

WORKDIR /app

COPY src/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/src
RUN chmod +x start.sh
CMD ["./src/backend/start.sh"]
ENV PYTHONPATH=/app

CMD ["./start.sh"]
