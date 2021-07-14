import initAnimaNumeros from './anima-numeros.js';

export default function initFetchAnimais() {
  function createAnimal(animal) {
    //  console.log(animal);
    const div = document.createElement('div');
    div.classList.add('numero-animal'); // pra criar mais um div dos numeros

    div.innerHTML = `<h3>${animal.especie}</h3> <span data-numero>${animal.total}</span>`;
    //  console.log(div);

    return div;
  }

  async function fetchAnimais(url) {
    try {
      const animaisResponse = await fetch(url);
      const animaisjson = await animaisResponse.json();
      const numerosGrid = document.querySelector('.numeros-grid');

      //  console.log(animaisjson);

      animaisjson.forEach((animal) => {
        const divAnimal = createAnimal(animal);
        //  console.log(divAnimal);
        numerosGrid.appendChild(divAnimal); //  adiciona o anima e o numero com base no api entao nao precisa ter mais nada no index
      });
      initAnimaNumeros(); // É PARA OS NUMEROS DE ANIMAIS SO COMEÇAREM A ACONTECER DEPOIS DO fetch
    } catch (erro) {
      console.log(erro);
    }
  }
  fetchAnimais('./animaisapi.json');
}
