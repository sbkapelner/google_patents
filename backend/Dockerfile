FROM python:3.10-slim

COPY . .

RUN pip install -r requirements.txt

CMD ["gunicorn", "--bind", "0.0.0.0:80", "--timeout=1000", "--workers=1", "--threads=3", "app:app"]