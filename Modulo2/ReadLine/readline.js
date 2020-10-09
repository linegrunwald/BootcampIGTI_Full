import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

pergunta();

function pergunta() {
  rl.question('Digite um número: ', (numero) => {
    const multiplos = [];

    //console.log(numero);
    //rl.close();
    if (parseInt(numero) < 0) {
      rl.close();
    } else {
      for (let i = 3; i < parseInt(numero); i++) {
        if (i % 3 === 0 || i % 5 === 0) {
          multiplos.push(i);
        }
      }
      console.log(multiplos);
      pergunta();
    }
  });
}
