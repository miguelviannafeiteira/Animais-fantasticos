export default function fetchbitcoin(url, target) {
  fetch(url)
    .then((response) => response.json())
    .then((bitcoin) => {
      const btcPreco = document.querySelector(target);
      btcPreco.innerText = (1000/ bitcoin.BRL.sell).toFixed(4);// 1000 reais em bitcoin e só para aparcer 4 casas decimais
    }).catch((erro) => {
      console.log(Error(erro));
    });
}
