export default function initFuncionamento() {
  const funcionamento = document.querySelector('[data-semana]');
  const diasSemana = funcionamento.dataset.semana.split(',').map(Number);
  const horarioSemana = funcionamento.dataset.horario.split(',').map(Number);
  //  o split é para transformar a string dada pelo diasSemana em array. Vai dar o split sempre que tiver uma virgula. O map (Number) é para os itens dentro da array virarem numeros

  const dataAgora = new Date();
  const diaAgora = dataAgora.getDay();
  const horarioAgora = dataAgora.getHours();

  const semanaAberto = diasSemana.indexOf(diaAgora) !== -1;
  // diasSemana é uma array com os dias da semana. Ve se é diferente que -1, porque -1 representa sábado e domingo

  const horarioAberto = (horarioAgora >= horarioSemana[0] && horarioAgora < horarioSemana[1]);
    // horarioSemana [8,18]horarioSemana[0] faz referencias as 8 horas e o horarioSemana[1 faz referencias as 18 horas]

  if (semanaAberto && horarioAberto) {
    funcionamento.classList.add('aberto');
  }
}
