// eslint-disable-next-line max-classes-per-file
import debounce from './debounce.js';

export class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {
      finalPosition: 0, //  a posição final do slide começa no 0
      startX: 0,
      movement: 0, //  total que se moveu no momento que está clicando
    };
    this.activeClass = 'active';
    this.changeEvent = new Event('changeEvent');
  }

  transition(active) {
    //  se o active for true  adiciona o transform .3s se for false coloca 0
    this.slide.style.transition = active ? 'transform .4s' : '';
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement; //  soma o o valor da posição final com o valor de dist para que assim salve onde o slide parou e não para o começo toda hora que clicar para passar o slide
    //  o menos é para ficar no sentido certo
  }

  onStart(event) {
    let movetype;

    if (event.type === 'mousedown') {
      //  se o tipo do evento for mousedown vai prevenir o default e vai ter o clientX como esse

      event.preventDefault();
      this.dist.startX = event.clientX;// clientX é a propriedade que guarda o valor
      movetype = 'mousemove';
    } else {
      //  eu quero o primeiro toque, e desse primeiro toque eu quero o clientX. Para ver a propriedade changedTouches é só dar console.log(event);
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = 'touchmove';
      this.transition(false); //  quando começar o evento remove o transition
    }

    //  o evento de mousemove só é ativado quando se clica
    this.wrapper.addEventListener(movetype, this.onMove);
  }

  onMove(event) {
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    //  se o onEnd é igual ao mouseup, se for o movetype vai ser igual ao mousemove se nao vai ser igual a touchmove
    const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';

    //  esse evento só é ativado quando o mouse for desclicado 'mouseup'
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
    this.transition(true); // quando o evento terminar volta a ser true

    this.changeSlideOnEnd();
  }

  changeSlideOnEnd() {
    //  se o this.dist.movement for mais que 120 ele vai
    // this.index.next !== undefined para ver se o proximo é diferente que undefined
    if (this.dist.movement > 120 && this.index.next !== undefined) {
      this.activeNextSlide();
    } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
      this.activePrevSlide();
    } else { // Se nao for nenhum dos dois anteriores se ativa o atual
      this.changeSlide(this.index.active); //  caso esteja tentando ir do 0 para o -1 volta para o 0
    }
  }

  addSlideEvents() {
    //  mousedown quer dizer exatamente no momento em que eu clico
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  //  Slides config

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return {
        position,
        element,
      };
    });
    //  para desestruturar os filhos do this.slide e criar uma array. E o map é para retornar um objeto com alguma das outras partes

    //  console.log(this.slideArray);
    //  o valor desse console.log é o valor exato para a imagem ficar no centro
  }

  slidesIndexNav(index) {
    //  Esse método é para saber qual é o slide atual o proximo e o anterior. Mas nao pode passar de 0 ou 5
    const last = this.slideArray.length - 1; // para saber o ultimo
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];

    this.moveSlide(activeSlide.position); // se colocar index 1, vai para a imagem 1, index 2 imagem 2. Pode teste colocando 'slide.changeSlide(5)' no script.js
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
    this.changeActiveClass();
    this.wrapper.dispatchEvent(this.changeEvent);
  }

  changeActiveClass() {
    this.slideArray.forEach((item) => {
      item.element.classList.remove(this.activeClass);
    });
    this.slideArray[this.index.active].element.classList.add(this.activeClass);
  }

  activePrevSlide() {
    if (this.index.prev !== undefined) {
      this.changeSlide(this.index.prev);
    }
  }

  activeNextSlide() {
    if (this.index.next !== undefined) {
      this.changeSlide(this.index.next);
    }
  }

  onResize() {
    setTimeout(() => {
      this.slidesConfig();
      this.changeSlide(this.index.active);
    }, 500);
  }

  addResizeEvent() {
    window.addEventListener('resize', this.onResize);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);

    this.activePrevSlide = this.activePrevSlide.bind(this);
    this.activeNextSlide = this.activeNextSlide.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 200); // para a função de resize nao seja ativa muitas vezes
  }

  init() {
    this.bindEvents(); // se nao fizer o bind o quando clicar na imagem vai fazer referencia ao wrapper e nao ao objeto Slide
    this.transition(true); // começar como true
    this.addSlideEvents();
    this.slidesConfig();
    this.addResizeEvent();
    this.changeSlide(0);

    return this;
  }
}

export default class SlideNav extends Slide {
  constructor(slide, wrapper) {
    super(slide, wrapper);
    this.bindControlEvents();
  }

  addArrow(prev, next) {
    this.prevElement = document.querySelector(prev);
    this.nextElement = document.querySelector(next);
    this.addArrowEvent();
  }

  addArrowEvent() {
    this.prevElement.addEventListener('click', this.activePrevSlide);
    this.nextElement.addEventListener('click', this.activeNextSlide);
  }

  createControl() {
    const control = document.createElement('ul');
    control.dataset.control = 'slide';
    this.slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href="#slide${index + 1}">${index + 1}</a></li>`;
    });
    this.wrapper.appendChild(control);
    return control;
  }

  eventControl(item, index) {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      this.changeSlide(index);
    });
    this.wrapper.addEventListener('changeEvent', this.activeControlItem);
  }

  activeControlItem() {
    this.controlArray.forEach((item) => {
      item.classList.remove(this.activeClass);
    });
    this.controlArray[this.index.active].classList.add(this.activeClass);
  }

  addControl(customControl) {
    this.control = document.querySelector(customControl) || this.createControl();
    this.controlArray = [...this.control.children];

    this.activeControlItem();
    this.controlArray.forEach(this.eventControl);
  }

  bindControlEvents() {
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }
}
