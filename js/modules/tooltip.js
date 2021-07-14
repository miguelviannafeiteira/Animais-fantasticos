//  Tooltip é aquela coisa de quando a pessoa passa o mouse por cima automaticamente abre uma caixinha com mais informações

export default function initToolTip() {
  const tooltips = document.querySelectorAll('[data-tooltip]');

  const onMouseMove = {
    handleEvent(event) {
      this.tooltipBox.style.top = `${event.pageY + 20}px`;
      this.tooltipBox.style.left = `${event.pageX + 20}px`;
      // para a caixinha ser adionada onde o mouse está, sempre reatulizando esse event quando o mouse mexer. Esses 20 + é para a caixa aparecer um pouco abaixo do mouse e nao ficar piscando, entao nao se passa o mouse por cima dela sempre
    },
  };

  const onMouseLeave = {
    tooltipBox: '',
    element: '',
    //  Essas duas propriedades nao sao necessarias, porque a propriedade pode ser atribuida sem ter ela aqui pre definida, so precisando ter a atruibuição acima
    handleEvent() {
      this.tooltipBox.remove();
      this.element.removeEventListener('mouseleave', onMouseLeave);
      this.element.removeEventListener('mousemove', onMouseMove); //  esses removeEventListener é para remover o evento quando nao estiver passando por cima do mapa
    },
  }; // para o tolltipBox ser puxado da function acima o onMouseLeave percisa ser um objeto e nao uma function. Para o objeto ser executado como um callback precisa ter o metodo de handleEvent

  function criarTooltipBox(element) {
    const tooltipBox = document.createElement('div');
    const text = element.getAttribute('aria-label');
    tooltipBox.classList.add('tooltip');
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    return tooltipBox;
  }

  function onMouseOver() {
    const tooltipBox = criarTooltipBox(this); // this se refere ao item do tooltips.forEach. O que ta dentro dessas tooltipBox é o retorno da function criarTooltipBox

    onMouseMove.tooltipBox = tooltipBox;
    this.addEventListener('mousemove', onMouseMove);

    onMouseLeave.tooltipBox = tooltipBox;
    onMouseLeave.element = this;
    this.addEventListener('mouseleave', onMouseLeave);
  }

  tooltips.forEach((item) => {
    item.addEventListener('mouseover', onMouseOver);
  });
}
