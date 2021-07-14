export default function initAnimaNumeros() {
  function animaNumeros() {
    const numeros = document.querySelectorAll('[data-numero]');

    numeros.forEach((numero) => {
      const total = +numero.innerText;
      const incremento = Math.floor(total / 100);

      let start = 0;
      const timer = setInterval(() => {
        start += incremento;// start = start + incremento;
        numero.innerText = start;
        if (start > total) {
          numero.innerText = total;
          clearInterval(timer);
        }
      }, 50 * Math.random());
    });
  }

  // Função para criar um observador que vai olhar só para a section dos numeros, para que assim ela nao carregue logo que a pagina for aberta, mas sim quando o usuário chegar na section
  let observer;
  function handleMutation(mutation) {
    // console.log('Mutou'); //por causa do else if do scroll animacao o mutou so ocorre quando passa por cima dos Números
    if (mutation[0].target.classList.contains('ativo')) {
      observer.disconnect(); // quando ocorrer a animação ele para de observar
      animaNumeros();
    }
  }
  observer = new MutationObserver(handleMutation);

  const observeTarget = document.querySelector('.numeros');

  observer.observe(observeTarget, { attributes: true });
}
