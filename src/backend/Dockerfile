FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt --extra-index-url https://download.pytorch.org/whl/cpu

COPY . .

RUN chmod +x ./start.sh

ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

CMD ["./start.sh"]