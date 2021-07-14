export default function outsideClick(element, events, callback) { //  esse element é o this
  const html = document.documentElement; // para selecionar o html
  const outside = 'data-outside';

  function handleOutSideClick(event) {
    // console.log(event.target); comando para ver onde está clicando

    if (!element.contains(event.target)) { // isso é para verificar se está clicando dentro do dropdown ou nao. Se estiver clicando fora o callback acontece
      element.removeAttribute(outside);
      events.forEach((userEvent) => {
        html.removeEventListener(userEvent, handleOutSideClick);
      }); //  para passar mais de um evento direto

      // html.removeEventListen('click', handleOutSideClick);// para que o evento adicionado pelo outsideClick seja removido quando se clica fora

      callback();
    }
  }

  if (!element.hasAttribute(outside)) {
  //  se tiver o atributo outside nao ativa isso, e se nao tiver ativa uma vez
    events.forEach((userEvent) => {
      setTimeout(() => { html.addEventListener(userEvent, handleOutSideClick); }); // para passar mais de um evento direto
    }); // setTimeout serve para que esse eventListiner só seja adicionado ao html depois da fase de booble. Sem o setTimeout, por causa do booble ele faz a adição do evento, instantanemanete faz o booble até o html e ja ativa de novo
    //  html.addEventListener ('click', handleOutsideClick)

    element.setAttribute(outside, '');
  }
}

//  Esse script tem a finalidade de fazer com que o menu dropdown abra se passar o mouse por cima ou tambem se clicar com o mouse ou com o dedo no celular/tablet, e para fechar o menu é só clicar fora dele ou no proprio sobre
