import ScrollSuave from './modules/scroll-suave.js';
import initAnimacaoScroll from './modules/scroll-animacao.js';
import initAccordion from './modules/accordion.js';
import initTabNav from './modules/tabNav.js';
import initModal from './modules/modal.js';
import initToolTip from './modules/tooltip.js';
import initDropDownMenu from './modules/dropdown-menu.js';
import initMenuMobile from './modules/menu-mobile.js';
import initFuncionamento from './modules/funcionamento.js';
import initFetchAnimais from './modules/fetch-animais.js';
import initFetchbitcoin from './modules/fetch-bitcoin.js';

const scrollSuave = new ScrollSuave('[data-menu="suave"] a[href^="#"]');
scrollSuave.init();

initAnimacaoScroll();
initAccordion();
initTabNav();
initModal();
initToolTip();
initDropDownMenu();
initMenuMobile();
initFuncionamento();
initFetchAnimais();
initFetchbitcoin();

// DA PARA IMPROTAR FACILMENTE UM SCRIPT EXTERNO

// import $ from 'jquery'
// import _ from 'lodash'

// $('nav').hide(); // esconde a navegação usando jquery
// const diferenca = _.difference(['Banana', 'Uva'], ['Banana', 'Morango']);
// console.log(diferenca); // função do lodash que serve para ver o que tem de diferente entre duas array's
