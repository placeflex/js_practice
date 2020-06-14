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
});
