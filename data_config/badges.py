import json

badges = [
    {
        'name': 'Wodowstrzymywacz miesiąca',
        'level': 1,
        'description': '''Zużyłeś w tym miesiącu mniej wody niż w poprzednim. Należy się za to nagroda!''',
        'points': 100,

    },
    {
        'name': 'Szybkie mycie!',
        'level': 1,
        'description': '''Szybki prysznic - szybkie punkty! 30 sekund to wystarczająco dużo na poranną kąpiel!''',
        'points': 10,

    },
    {
        'name': 'Fajrant pralka',
        'level': 1,
        'description': '''Jedno pranie mniej - a tyle zaoszczędzonej wody! Należy Ci się za to odpowiednia nagroda.''',
        'points': 50,

    },
    {
        'name': 'Wodowstrzymywacz kwartału!',
        'level': 1,
        'description': '''Kwartał oszczędzania wody to na prawdę rewelacyjny wynik. 
        Spróbuj zmniejszyć o 10% zużycie wody w kolejnym miesiącu, aby dostać kolejny poziom!''',
        'points': 200,

    }]


with open("badges.json", "w") as file:
    json.dump(badges, file)
