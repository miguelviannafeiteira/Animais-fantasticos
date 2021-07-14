function initTabNav (){
const tabMenu = document.querySelectorAll('[data-tab="menu"] li');
const tabContent = document.querySelectorAll('[data-tab="content"] section ');

if(tabMenu.length && tabContent.length){
//para o codigo ocorrer precisa ter as duas const, caso n tenha, por causa desse comando, não vai dar erro
  function activeTab(index) {
    tabContent.forEach ((section) => {
      section.classList.remove ('ativo');
    });
    const direcao = tabContent[index].dataset.anime;
    tabContent[index].classList.add('ativo', direcao);
  }
  // remove a classe ativo de todas os itens e só coloca somente no item escolhido com activeTab ()

  tabMenu.forEach ((itemMenu, index) => {
  itemMenu.addEventListener('click', function(){
    activeTab(index);
  });
  });
  //itemMenu é o item especifico do loop. Esse index se relaciona com o index do activeTab, desse modo mostrando o index de cada uma das imagens. A cada item é adicionado um evento de click e a partir desse evento ele vai excutar a função. Quando se executa essa função vai executar a activeTab que vai receber como argument o index do item especifico que estou clicando

  tabContent [0].classList.add ('ativo');
  //pra o primeiro item comçar com class ativo, assim o site n fica em branco quando o usuario entra. Poderia so colocar a class ativo no html

}
}

initTabNav();
//pra isolar o script de cima e nao dar erro. Esse iniTabNav é so para ativar a função

export default function initAccordion () {
  const accordionList = document.querySelectorAll ('[data-anime="accordion"] dt');
  const activeClass = 'ativo';
  if (accordionList.length) {

      accordionList[0].classList.add(activeClass);
      accordionList[0].nextElementSibling.classList.add(activeClass);


      function activeAccordion () {
        this.classList.toggle (activeClass);
      this.nextElementSibling.classList.toggle(activeClass);
      }
      // ao inves de colocar this pode-se colocar:
      //function activeAccordion (event) {
      // console.log (event.currentTarget);
      //}
      //o this ta se referindo ao item, do accordionList em que to clicando no momento. entao quando clica vai para o item seguinte do que eu cliquei, se eu cliquei no dt vai para o dd.

      accordionList.forEach ((item) => {
        item.addEventListener('click', activeAccordion);
      });
  }
}
initAccordion ();


export default function initScrollSuave () {

  const linksInternos = document.querySelectorAll ('[data-menu="suave"] a[href^="#"]');

  function scrollToSection (event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    //para pegar o atributo do href do link que eu peguei. Esse href dado por esse comando é por exemplo #contato, que é igual a forma e selecionar um id com queryselector. Entao a section abaixo vai puxar a section que tem a idade contato, animais e faq. Caso use event.currentTargett .href, vai pegar o url tambem. 
    const section = document.querySelector(href);
    //Isso aqui faz o link entre o item e seção. 
    console.log(section);
    //quando clica no item sai a section no console, portanto ja tem um link entre os dois. OffsetTop pra ver a distancia da section do topo
    //
    section.scrollIntoView ({
      behavior: 'smooth',
      block:'start', //para alinhar certinho ao começo da section
    });
  //scroolIntoView é uma função que tem propriedades que sao objetos por isso que dentro dele se colo ({})
  //Esse modo nao precisa calcular a distancai em relação ao topo

    //forma alternativa para fazer o scroll suave
    // const topo = section.offsetTop;
    // window.scrollTo ({
    //   top: topo,
    //   behavior:'smooth',
    // });
    
  }

  linksInternos.forEach ((link) => {
    link.addEventListener('click', scrollToSection)
  });
  //para adicionar um evento para cada item
}



export default function initAnimacaoScroll() {
  const sections = document.querySelectorAll ('[data-anime="scroll"]');
  if (sections.length){
    const windowMetade = window.innerHeight * 0.6;

    function animaScroll () {
      sections.forEach ((section) => {
        const sectionTop = section.getBoundingClientRect ().top;
        const isSectionVisible = (sectionTop - windowMetade) < 0;
        if (isSectionVisible) {
        section.classList.add('ativo');
        }
      })
    }

    animaScroll () 
    //Se nao der essa ativação no site logo no inicio quando a pessoa abre o site só aparece o header, e para aparecer a rapaso precisa dar o scroll

    window.addEventListener ('scroll', animaScroll)
    }
}
