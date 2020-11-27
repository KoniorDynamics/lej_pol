FROM python:3.8

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /src/app
COPY requirements.txt /src/app/
RUN pip install -r requirements.txt

COPY . /src/app/