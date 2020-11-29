
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/KoniorDynamics/lej_pol">
    <img src="images/lilia.png" alt="Logo" width="375" height="124">
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



<!-- Spis treści -->
## Spis treści

* [O PROJEKCIE](#o-projekcie)
  * [Technologie](#technologie)
* [Jak rozpocząć?](#jak-rozpocząć)
  * [Narzędzia](#narzędzia)




<!-- O PROJEKCIE -->
## O PROJEKCIE

Aplikacja "Lilia" to system inteligentnego zarządzania wodą w domu.

Lilia pozwala zidentyfikować w czasie rzeczywistym do czego wykorzystywana jest woda - do kąpieli, spłukiwania wody w toalecie czy też robienia prania.

Zebrane w ten sposób dane pozwalają oszacować ile pieniędzy wydaliśmy na daną czynność. Dzięki wysyłaniu inteligentnych notyfikacji na telefon użytkownik od razu zostaje poinformowany o tym ile kosztowała go poranna kąpiel. Aplikacja nie tylko informuje o tym ile wydaliśmy pieniędzy, ale także motywuje nas do tego, abyśmy ją oszczędzali wodę przyznając odpowiednie nagrody za jej zmniejszone zużycie w kolejnych miesiącach. 

Punkty i otrzymane badge użytkownik może wydać w dedykowanym marketplace. Oszczędzanie wody (a także pieniędzy) pozwala dodatkowo zaoszczędzić kolejne pieniądze otrzymując nagrody i zniżki dla zakupy u partnerów biznesowych, którzy rozumieją konieczność wdrażania ekologicznych rozwiązań. 


### Użyte technologie
* [React](https://reactjs.org/)
* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [xGBoost](https://xgboost.readthedocs.io/en/latest/)
* [PostreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)
* [Kubernetes](https://kubernetes.io/pl/)



<!-- JAK ROZPOCZĄĆ? -->
## Jak rozpocząć?

Aby pobrać aplikacje na swój komputer i ją uruchomić wykonaj następujące czynności:

1. Open Terminal

2. git clone git@github.com:KoniorDynamics/lej_pol.git

3. Press Enter. Your local clone will be created.

### Start docker container

4. _(sudo - optional)_ docker-compose up --build 


### Budowanie Bazy Danych

5. _(sudo - optional)_  docker-compose exec backend flask db init
6. _(sudo - optional)_  docker-compose exec backend flask db migrate -m "init migration"
7. _(sudo - optional)_  docker-compose exec backend flask db upgrade


### Porty

- Licznik: localhost:3002
- MLModel: localhost:8000
- Frontend: localhost:3001
- Backend: localhost:5000

### Narzędzia

[Tutaj](https://github.com/KoniorDynamics/lej_pol/blob/master/backend/requirements.txt) wszystkie wymagane paczki.



