FROM python:3.8


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /src/app
COPY requirements.txt /src/app/
RUN pip install -r requirements.txt
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000
ENV FLASK_ENV=development
ENV SECRET_KEY='secret'

COPY . /src/app/
CMD ["flask","run"]
