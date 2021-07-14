export default function initTabNav() {
  const tabMenu = document.querySelectorAll('[data-tab="menu"] li');
  const tabContent = document.querySelectorAll('[data-tab="content"] section ');

  function activeTab(index) {
    tabContent.forEach((section) => {
      section.classList.remove('ativo');
    });
    const direcao = tabContent[index].dataset.anime;
    tabContent[index].classList.add('ativo', direcao);
  }

  if (tabMenu.length && tabContent.length) {
  //  para o codigo ocorrer precisa ter as duas const, caso n tenha,
  //  por causa desse comando, não vai dar erro
  // remove a classe ativo de todas os itens e só coloca somente no item escolhido com activeTab ()
    tabMenu.forEach((itemMenu, index) => {
      itemMenu.addEventListener('click', () => {
        activeTab(index);
      });
    });
    //  itemMenu é o item especifico do loop. Esse index se relaciona com o index do activeTab, desse modo mostrando o index de cada uma das imagens. A cada item é adicionado um evento de click e a partir desse evento ele vai excutar a função. Quando se executa essa função vai executar a activeTab que vai receber como argument o index do item especifico que estou clicando

    tabContent[0].classList.add('ativo');
    //  pra o primeiro item comçar com class ativo, assim o site n fica em branco
    //  quando o usuario entra. Poderia so colocar a class ativo no html
  }
}
