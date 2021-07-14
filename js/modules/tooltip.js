//  Tooltip é aquela coisa de quando a pessoa passa o mouse por cima automaticamente abre uma caixinha com mais informações

//  Sempre que tiver callback com this de addEventListener ou de qualquer coisa, precisa fazer o bind

export default class Tooltip {
  constructor(tooltips) {
    this.tooltips = document.querySelectorAll(tooltips);
    //  bind do objeto da classe aos callbacks
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  //  move a tooltip com base em seus estilos
  //  de acordo com a posição do mouse
  onMouseMove(event) {
    this.tooltipBox.style.top = `${event.pageY + 20}px`;
    if (event.pageX + 240 > window.innerWidth) {
      this.tooltipBox.style.left = `${event.pageX - 190}px`;
    } else {
      this.tooltipBox.style.left = `${event.pageX + 20}px`;
    }
  };

  //  remove a tooltip e os eventos de mouseMove e mouseLeave
  onMouseLeave({currentTarget}) {
    this.tooltipBox.remove();
    currentTarget.removeEventListener('mouseleave', this.onMouseLeave);
    currentTarget.removeEventListener('mousemove', this.onMouseMove);
  };

  //  Cria a tooltip box e coloca no body
  criarTooltipBox(element) {
    const tooltipBox = document.createElement('div');
    const text = element.getAttribute('aria-label');
    tooltipBox.classList.add('tooltip');
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    this.tooltipBox = tooltipBox;
  }

  //  Cria a tooltip e adiciona os eventos de mouseMove e
  //  mouseLeave ao target
  onMouseOver({currentTarget}) {
    //  cria a toolrtipbox e coloca em uma propriedaed
    this.criarTooltipBox(currentTarget);

    currentTarget.addEventListener('mousemove', this.onMouseMove);

    currentTarget.addEventListener('mouseleave', this.onMouseLeave);
  }

  // Adiciona os eventos de mouseOver a cada tooltip
  addTooltipsEvent() {
    this.tooltips.forEach((item) => {
      item.addEventListener('mouseover', this.onMouseOver);
    });
  }

  init() {
    if (this.tooltips.length) {
      this.addTooltipsEvent();
    }
    return this
  }
}
