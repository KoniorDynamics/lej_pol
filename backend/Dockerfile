FROM python:3.8

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
WORKDIR /src/app
COPY requirements.txt /src/app/
RUN pip install -r requirements.txt

EXPOSE 5000

COPY . /src/app/