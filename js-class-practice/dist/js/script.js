window.addEventListener('DOMContentLoaded', () => {
  // tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsWrapper = document.querySelector('.tabheader__items');

  function hideTabsContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show');
    });

    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabsContent(i = 0) {
    tabsContent[i].classList.add('show');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  tabsWrapper.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (item == target) {
          hideTabsContent();
          showTabsContent(i);
        }
      });
    }
  });

  hideTabsContent();
  showTabsContent();

  // modal

  const modalsBtns = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    closeModal = document.querySelector('[data-close]');

  function btnModalTrigger() {
    modalsBtns.forEach((btn) => {
      btn.addEventListener('click', modalShow);
    });
  }

  function btnModalCloseTrigger() {
    closeModal.addEventListener('click', modalHide);
  }

  btnModalTrigger();
  btnModalCloseTrigger();

  function modalShow() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
    window.removeEventListener('scroll', showModalByScroll);
  }

  function modalHide() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  modal.addEventListener('click', (e) => {
    if (e.target == modal) {
      modalHide();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape' && modal.classList.contains('show')) {
      modalHide();
    }
  });

  const modalTimerId = setTimeout(modalShow, 3000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      modalShow();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  // menu day

  class MenuDay {
    constructor(selector, picture, title, text, price, ...classes) {
      this.selector = document.querySelector(selector);
      this.picture = picture;
      this.title = title;
      this.text = text;
      this.price = price;
      this.classes = classes;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
      <img src="${this.picture}" alt="vegy">
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.text}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>`;
      this.selector.append(element);
    }
  }
  new MenuDay(
    '.menu__field .container',
    'img/tabs/post.jpg',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
    430
  ).render();

  new MenuDay(
    '.menu__field .container',
    'img/tabs/elite.jpg',
    'Меню "Премиум"',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550
  ).render();
  new MenuDay(
    '.menu__field .container',
    'img/tabs/vegy.jpg',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229
  ).render();
});
