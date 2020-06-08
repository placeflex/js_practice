/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
  movies: [
    'Авиа',
    'Бункер',
    'Логан',
    'Лига справедливости',
    'Ла-ла лэнд',
    'Одержимость',
    'Скотт Пилигрим против...',
  ],
};

function removeAdBlocks() {
  const adBlocks = document.querySelectorAll('.promo__adv img');
  adBlocks.forEach((elem) => {
    elem.remove();
  });
}
removeAdBlocks();

function changeGanreFilms(ganre) {
  const ganreFilms = document.querySelector('.promo__genre');
  ganreFilms.innerHTML = ganre;
}
changeGanreFilms('Драма');

function changeFilmsBgBanner() {
  const bgBannerFilm = document.querySelector('.promo__bg');
  bgBannerFilm.style.background =
    'url("../img/bg.jpg") center center/cover no-repeat';
}

changeFilmsBgBanner();

function showNewListFilms() {
  const wrapperListFilms = document.querySelector('.promo__interactive-list');
  wrapperListFilms.innerHTML = '';
  movieDB.movies.sort().forEach((elem, i) => {
    wrapperListFilms.innerHTML += `
      <li class="promo__interactive-item">${i + 1}. ${elem}
         <div class="delete"></div>
      </li>`;
  });
}

showNewListFilms();
