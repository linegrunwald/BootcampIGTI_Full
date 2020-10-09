import * as dados from './dados.js';

const start = async () => {
  await dados.pegaDados();
  await dados.top5MaisCidades();
  await dados.top5MenosCidades();
  await dados.printMaioresNomesCidades();
  await dados.printMenoresNomesCidades();
  await dados.printMaiorNomeTodasCidade();
  await dados.printMenorNomeTodasCidade();
  process.exit()
}

start();