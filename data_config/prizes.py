import json

prizes = [
    {
        'name': 'MAXTRA+ Pure Performance wkład filtrujący do wody',
        'description': '''Oszczędzasz na wodzie - pijesz czystą wodę za darmo. 
     Redukcja metali takich jak: ołów i miedź oraz filtracja zanieczyszczeń z rur w prezencie dla Ciebie''',
        'points': 100,

    },
    {
        'name': '15 zł na Twoje zamówienie w Pyszne.pl',
        'description': '''Zaoszczędziłeś sporo wody! Zasłużyłeś na coś dobrego. 
        Koniecznie daj znać, czy smakowało!:) ''',
        'points': 200,

    }, {
        'name': '15 zł na Twoje zamówienie w Pyszne.pl',
        'description': '''Zaoszczędziłeś sporo wody! Zasłużyłeś na coś dobrego. 
        Koniecznie daj znać, czy smakowało!:) ''',
        'points': 200,

    }, {
        'name': '10 zł na Twoje zamówienie w Pyszne.pl',
        'description': '''Mniam mniam... Zasłużyłeś na coś dobrego. Oszczędzaj wodę i jedz za darmo!
        ''',
        'points': 150,

    }, {
        'name': '1 mcs z Allegro Smart dla Ciebie',
        'description': '''Oszczędzaj wodę i korzystaj z dodatkowych zniżek 
        przez miesiąc na stronie naszego partnera.''',
        'points': 300,

    },
]

with open("prizes.json", "w") as file:
    json.dump(prizes, file)
