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
    // constructor(picture, title, text, price) {
    //   this.picture = picture;
    //   this.title = title;
    //   this.text = text;
    //   this.price = price;
    //   {
    //     picture: '1.png',
    //     title: '13123213',
    //     text: '3123123123123123123123',
    //     price: '111'
    //   }
    // }

    constructor(options) {
      console.log(options);
      this.selector = document.querySelector(options.selector);
      this.picture = options.picture;
      this.title = options.title;
      this.text = options.text;
      this.price = options.price;
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = `<div class="menu__item">
      <img src="${this.picture}" alt="vegy">
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.text}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>
  </div>`;

      this.selector.append(element);
    }
  }
  new MenuDay({
    selector: '.menu__field .container',
    picture: 'img/tabs/post.jpg',
    title: 'Меню "Постное"',
    text:
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
    price: 430,
  }).render();
  new MenuDay({
    selector: '.menu__field .container',
    picture: 'img/tabs/elite.jpg',
    title: 'Меню "Премиум"',
    text:
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    price: 550,
  }).render();
  new MenuDay({
    selector: '.menu__field .container',
    picture: 'img/tabs/vegy.jpg',
    title: 'Меню "Фитнес"',
    text:
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    price: 229,
  }).render();
});
