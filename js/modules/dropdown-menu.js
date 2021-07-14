import outsideClick from './outsideclick.js';

export default function initDropDownMenu() {
  const dropdownMenus = document.querySelectorAll('[data-dropdown]');

  function handleClick(event) {
    event.preventDefault();
    this.classList.add('active');
    outsideClick(this, ['touchstart', 'click'], () => {
//  esse this é para verificar para ver se quando to clicando no lado de fora é realmente no lado de fora e nao em cima do meu elemento para nao tirar ele. Entao nessa function esta sendo passado this, element e o callback
      this.classList.remove('active');
    });
  }

  dropdownMenus.forEach((menu) => {
    //  menu.addEventListener('click', handleClick);
    //  menu.addEventListener('touchstart', handleClick); 
    //  Esses dois eventos podem ser simplificados em uma array, como está abaixo.
    ['touchstart', 'click'].forEach((userEvent) => {
      menu.addEventListener(userEvent, handleClick);
    });
  });
}
