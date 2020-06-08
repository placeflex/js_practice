/* Задание на урок:

1) У нас уже есть рабочее приложение, состоящее из отдельных функций. Представьте, что
перед вами стоит задача переписать его так, чтобы все функции стали методами объекта personalMovieDB
Такое случается в реальных продуктах при смене технологий или подхода к архитектуре программы

2) Создать метод toggleVisibleMyDB, который при вызове будет проверять свойство privat. Если оно false - он
переключает его в true, если true - переключает в false. Протестировать вместе с showMyDB.

3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку. 
Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены - 
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"*/

'use strict';

const personalMovieDB = {
  start() {
    let numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', 0);
    while (
      numberOfFilms == '' ||
      numberOfFilms == null ||
      isNaN(numberOfFilms)
    ) {
      numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', 0);
    }

    personalMovieDB.count = numberOfFilms;
  },
  remeberMyFilms() {
    for (let i = 1; i <= 2; i++) {
      let a = prompt('Один из последних просмотренных фильмов?', '');
      let b = +prompt('На сколько оцените его?', 0);

      if (a !== '' && b !== '' && a !== null && b !== null && a.length < 50) {
        personalMovieDB.movies[a] = b;
        console.log('done');
      } else {
        console.log('error');
        i--;
      }
    }
  },
  detectPersonalLevel() {
    if (personalMovieDB.count < 10) {
      console.log('Просмотрено довольно мало фильмов');
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
      console.log('Вы классический зритель');
    } else if (personalMovieDB.count > 30) {
      console.log('Вы киноман');
    } else {
      console.log('Произошла ошибка');
    }
  },
  toggleVisibleMyDB() {
    if (personalMovieDB.privat) {
      personalMovieDB.privat = false;
      console.log(personalMovieDB.privat);
    } else {
      personalMovieDB.privat = true;
      console.log(personalMovieDB.privat);
    }
  },
  showMyDB(hidden) {
    if (!hidden) {
      console.log(personalMovieDB);
    }
  },
  writeYourGenres() {
    for (let i = 1; i <= 3; i++) {
      let topGanres = prompt(`Ваш любимый жанр`);

      if (topGanres == null || topGanres == '') {
        topGanres = prompt(`Ваш любимый жанр`);
        i--;
      }
      personalMovieDB.genres[i - 1] = topGanres;
    }

    personalMovieDB.genres.forEach((elem, i) => {
      console.log(`Любимый жанр ${i + 1} - это ${elem}`);
    });
  },
  count: 0,
  movies: {},
  actors: {},
  genres: [],
  privat: false,
};

// personalMovieDB.start();

console.log(personalMovieDB);
