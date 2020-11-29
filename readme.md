
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/KoniorDynamics/lej_pol">
    <img src="images/lilia.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">LILIA</h3>

  <p align="center">Myśli o wodzie
    <br />
    <a href="https://github.com/KoniorDynamics/lej_pol"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/KoniorDynamics/lej_pol">View Demo</a>
    ·
    <a href="https://github.com/KoniorDynamics/lej_pol">Report Bug</a>
    ·
    <a href="https://github.com/KoniorDynamics/lej_pol/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Roadmap](#roadmap)




<!-- ABOUT THE PROJECT -->
## About The Project

Aplikacja "Lilia" to system inteligentnego zarządzania wodą w domu.

Lilia pozwala zidentyfikować w czasie rzeczywistym do czego wykorzystywana jest woda - do kąpieli, spłukiwania wody w toalecie czy też robienia prania.

Zebrane w ten sposób dane pozwalają oszacować ile pieniędzy wydaliśmy na daną czynność. Dzięki wysyłaniu inteligentnych notyfikacji na telefon użytkownik od razu zostaje poinformowany o tym ile kosztowała go poranna kąpiel. Aplikacja nie tylko informuje o tym ile wydaliśmy pieniędzy, ale także motywuje nas do tego, abyśmy ją oszczędzali wodę przyznając odpowiednie nagrody za jej zmniejszone zużycie w kolejnych miesiącach. 

Punkty i otrzymane badge użytkownik może wydać w dedykowanym marketplace. Oszczędzanie wody (a także pieniędzy) pozwala dodatkowo zaoszczędzić kolejne pieniądze otrzymując nagrody i zniżki dla zakupy u partnerów biznesowych, którzy rozumieją konieczność wdrażania ekologicznych rozwiązań. 


### Built With
* [React](https://reactjs.org/)
* [Flask](https://flask.palletsprojects.com/en/1.1.x/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

1. Open Terminal

2. git clone git@github.com:KoniorDynamics/lej_pol.git

3. Press Enter. Your local clone will be created.

### Build DB

3. _(sudo - optional)_  docker-compose exec backend flask db init
4. _(sudo - optional)_  docker-compose exec backend flask db migrate -m "init migration"
5. _(sudo - optional)_  docker-compose exec backend flask db upgrade

### Start docker container

6. _(sudo - optional)_ docker-compose up --build 
7. _(sudo - optional)_ docker-compose build --no-cache _**-to run without catche**_

_If not try_ --build _individual separately: _ backend, frontend, water_matter

### Ports

Licznik: localhost:3002
MLModel: localhost:8000
Frontend: localhost:3001
Backend: localhost:5000

### Prerequisites

[Here](https://github.com/KoniorDynamics/lej_pol/blob/master/backend/requirements.txt) you find all need software.




<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/KoniorDynamics/lej_pol/issues) for a list of proposed features (and known issues).

