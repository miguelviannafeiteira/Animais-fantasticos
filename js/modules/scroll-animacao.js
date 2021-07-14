export default function initAnimacaoScroll() {
  const sections = document.querySelectorAll('[data-anime="scroll"]');
  const windowMetade = window.innerHeight * 0.6;

  function animaScroll() {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const isSectionVisible = (sectionTop - windowMetade) < 0;
      if (isSectionVisible) {
        section.classList.add('ativo');
      } else if (section.classList.contains('ativo')) { // se relaciona com o anima numero, para que a function handleMutation só seja ativada caso tenha o ativo
        section.classList.remove('ativo');
      }
    });
  }

  if (sections.length) {
    animaScroll();
    //  Se nao der essa ativação no site logo no inicio quando a pessoa abre o site só aparece o header, e para aparecer a rapaso precisa dar o scroll

    window.addEventListener('scroll', animaScroll);
  }
}
