/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
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

  function handleSubmit() {
    document.querySelector('.add').addEventListener('submit', (e) => {
      e.preventDefault();
      let getFilmInput = document.querySelector('.adding__input').value;
      const checkbox = document.querySelector('[type="checkbox"]').checked;
      if (getFilmInput.length >= 21) {
        getFilmInput += `${getFilmInput.substring(0, 21)}...`;
      }

      if (getFilmInput) {
        movieDB.movies.push(getFilmInput);
        showNewListFilms();
        removeFilm();
      } else {
        alert('Введите название фильма');
      }

      if (checkbox) {
        console.log('Добавляем любимый фильм');
      }
    });
  }

  handleSubmit();

  function removeFilm() {
    const deleteBtns = document.querySelectorAll('.delete');
    deleteBtns.forEach((elem, i) => {
      elem.addEventListener('click', () => {
        elem.parentElement.remove();
        movieDB.movies.splice(i, 1);
        showNewListFilms();
        removeFilm();
      });
    });
  }
  removeFilm();
});
