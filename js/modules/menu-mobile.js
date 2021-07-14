import outsideClick from './outsideclick.js';

export default function initMenuMobile() {
  const menuButton = document.querySelector('[data-menu="button"]');
  const menuList = document.querySelector('[data-menu="list"]');
  const eventos = ['click', 'touchstart'];

  function openMenu() {
    menuList.classList.add('active');
    menuButton.classList.add('active');
    outsideClick(menuList, eventos, () => {
      menuList.classList.remove('active');
      menuButton.classList.remove('active'); 
    }); //quero que quando clicar fora do menuList ocorra essa function e quando isso ocorrer quero que só remova as classes
  }

  if (menuButton) {
    eventos.forEach((evento) => {
      menuButton.addEventListener(evento, openMenu);
    });
    menuButton.addEventListener('click', openMenu);
  }
}