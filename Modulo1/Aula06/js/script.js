var a = 5;
var b = 4;

if (a > b) {
  console.log(a + ' é maior que ' + b);
} else if (a < b) {
  console.log(a + ' é menor que ' + b);
} else {
  console.log(a + ' é igual a ' + a);
}

var dia = 1;
var r = '';
switch (dia) {
  case 1:
    r = 'Domingo';
    break;
  case 2:
    r = 'Segunda';
    break;
  case 3:
    r = 'Terça';
    break;
  case 4:
    r = 'Quarta';
    break;
  case 5:
    r = 'Quinta';
    break;
  case 6:
    r = 'Sexta';
    break;
  case 7:
    r = 'Sabado';
    break;
  default:
    r = 'Dia inválido';
    break;
}
console.log(r);

//operador ternário
a = 6;
b = 7;
var resposta = a > b ? 'maior' : a < b ? 'menor' : 'igual';
console.log(resposta);

var diaSemana =
  dia === 1
    ? 'Domingo'
    : dia === 2
    ? 'Segunda'
    : dia === 3
    ? 'Terça'
    : dia === 4
    ? 'Quarta'
    : dia === 5
    ? 'Quinta'
    : dia === 6
    ? 'Sexta'
    : dia === 7
    ? 'Sabado'
    : 'Dia inválido';
console.log(diaSemana);

//somatório com while
var numeroAtual = 1;
var somatorio = 0;
while (numeroAtual <= 10) {
  //somatorio = somatorio + numeroAtual;
  somatorio += numeroAtual;
  numeroAtual++;
}
console.log('A soma é ' + somatorio);

//somatório com do...while
var numeroAtual = 1;
var somatorio = 0;
do {
  somatorio += numeroAtual;
  numeroAtual++;
} while (numeroAtual <= 10);
console.log('A soma é ' + somatorio);

//somatório com for
var somatorio = 0;
for (numeroAtual = 0; numeroAtual <= 10; numeroAtual++) {
  somatorio += numeroAtual;
}
console.log('A soma é ' + somatorio);
