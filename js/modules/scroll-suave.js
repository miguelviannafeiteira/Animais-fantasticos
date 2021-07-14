export default function initScrollSuave() {
  const linksInternos = document.querySelectorAll('[data-menu="suave"] a[href^="#"]');

  function scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    //  para pegar o atributo do href do link que eu peguei. Esse href dado por esse comando é por exemplo #contato, que é igual a forma e selecionar um id com queryselector. Entao a section abaixo vai puxar a section que tem a idade contato, animais e faq. Caso use event.currentTargett .href, vai pegar o url tambem.
    const section = document.querySelector(href);
    //  Isso aqui faz o link entre o item e seção.
    console.log(section);
    //  quando clica no item sai a section no console, portanto ja tem um link entre os dois.
    //  OffsetTop pra ver a distancia da section do topo
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start', // para alinhar certinho ao começo da section
    });
    //  scroolIntoView é uma função que tem propriedades que sao objetos
    //  por isso que dentro dele se colo ({})
    //  Esse modo nao precisa calcular a distancai em relação ao topo

    //  sforma alternativa para fazer o scroll suave
    // const topo = section.offsetTop;
    // window.scrollTo ({
    //   top: topo,
    //   behavior:'smooth',
    // });
  }

  linksInternos.forEach((link) => {
    link.addEventListener('click', scrollToSection);
  });
  //  para adicionar um evento para cada item
}
