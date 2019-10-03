#film_editor

**Need Node.js v8.1+ in your PC.**

QUICK START
-----------
1) After downloading the repository run "npm install" command in three folder: main folder(./), ./server, ./front

2) Run all project with command "npm run dev" in main folder(./)


### Package in front: 
```
    "axios": "^0.19.0",
    "nanoid": "^2.1.0",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-files": "^2.4.8",
    "react-redux": "^7.1.1",
    "react-scripts": "3.1.1",
    "redux": "^4.0.4",
    "redux-thunk": "^2.3.0",
    "validator": "^11.1.0"
```

### Package in server: 
```
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "dotenv": "^8.0.0",
    "express": "^4.17.1",
    "mongoose": "^5.6.9",
    "nodemon": "^1.19.1"

```

### About file load:
You сan upload .txt format file to list, only in this format:

```
    Title: Blazing Saddles
    Release Year: 1974
    Format: VHS
    Stars: Mel Brooks, Clevon Little, Harvey Korman, Gene Wilder, Slim Pickens, Madeline Kahn

    Title: Casablanca
    Release Year: 1942
    Format: DVD
    Stars: Humphrey Bogart, Ingrid Bergman, Claude Rains, Peter Lorre

    Title: Charade
    Release Year: 1953
    Format: DVD
    Stars: Audrey Hepburn, Cary Grant, Walter Matthau, James Coburn, George Kennedy

    Title: Cool Hand Luke
    Release Year: 1967
    Format: VHS
    Stars: Paul Newman, George Kennedy, Strother Martin

```
PS: file in this repository, name: sample_movies.txt

### Format film object in MongoDb:

```
{
            "stars": [
                "Gene Hackman",
                " Barbara Hershey",
                " Dennis Hopper"
            ],
            "_id": "5d8b3ec84e78a530fc7ce203",
            "title": "Hooisers",
            "year": "1986",
            "format": "VHS",
            "myId": "P-0uH3dru6q4i5xy4vMFA"
        }

```

### Bootstrap 4

[Introduction](https://getbootstrap.com/docs/4.3/getting-started/introduction/)


### Fontawesome

[Site](https://fontawesome.com)

### Task

Необходимо реализовать веб-приложение для хранения информации о фильмах.

Информация о фильме:
1. Уникальный идентификатор
2. Название фильма
3. Год выпуска
4. Формат (VHS, DVD, Blu-Ray)
5. Список актеров (“Имя и фамилия актера”)

Функции, которые должна поддерживать система:
1. Добавить фильм
2. Удалить фильм
3. Показать информацию о фильме
4. Показать список фильмов отсортированных по названию в алфавитном порядке	
5. Найти фильм по названию.
6. Найти фильм по имени актера.
7. Импорт фильмов с текстового файла (пример файла прилагается “sample_movies.txt”). Файл должен загружаться через веб-интерфейс.
