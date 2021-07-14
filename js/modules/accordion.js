export default function initAccordion() {
  const accordionList = document.querySelectorAll('[data-anime="accordion"] dt');
  const activeClass = 'ativo';

  function activeAccordion() {
    this.classList.toggle(activeClass);
    this.nextElementSibling.classList.toggle(activeClass);
  }

  if (accordionList.length) {
    accordionList[0].classList.add(activeClass);
    accordionList[0].nextElementSibling.classList.add(activeClass);

    // ao inves de colocar this pode-se colocar:
    // function activeAccordion (event) {
    // console.log (event.currentTarget);
    // }
    // o this ta se referindo ao item, do accordionList em que to clicando no momento. entao quando clica vai para o item seguinte do que eu cliquei, se eu  cliquei no dt vai para o dd.

    accordionList.forEach((item) => {
      item.addEventListener('click', activeAccordion);
    });
  }
}
