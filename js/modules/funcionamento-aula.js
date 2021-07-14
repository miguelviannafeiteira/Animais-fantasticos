

const agora = new Date();
const futuro = new Date ('Dec 24 2021')

console.log(agora.getDate());
console.log(futuro);


function tranformarDias(tempo) {
  return tempo / (24 * 60 * 60 * 1000); //24 dias, 60 minutos, 60 segudos, 1000 milisegudos
}

const diasAgora = tranformarDias(agora.getTime())
const diasfuturo = tranformarDias(futuro.getTime())

console.log(diasfuturo - diasAgora); // faltal 182 dias para o natal