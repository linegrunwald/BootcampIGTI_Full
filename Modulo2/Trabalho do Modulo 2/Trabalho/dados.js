import { promises as fs } from 'fs';

export let estados = [];
export let cidades = [];
export let jsonCountCidades = [];
export let jsonMaiorNomeCidade = [];
export let jsonMenorNomeCidade = [];

export const pegaDados = async () => {
  await criaJsonEstadoECidade();
  await criarCidadesPorEstado();
  await coutCidadesEstado();
  await maiorNomeCidadeEstado();
  await menorNomeCidadeEstado();
};

const criaJsonEstadoECidade = async () => {
  try {
    estados = JSON.parse(await fs.readFile('Estados.json', "utf-8"));
    cidades = JSON.parse(await fs.readFile('Cidades.json', "utf-8"));
  } catch (error) {
    console.log(error);
  }
};

const criarCidadesPorEstado = async () => {
  try {
    //cria novos arquivos de cidades por estado
    const promises = estados.map(async (estado) => {
      const cidadesEstado = cidades.filter((cidade) => cidade.Estado === estado.ID);
      await fs.writeFile(
        './Estados/' + estado.Sigla + '.json',
        JSON.stringify(cidadesEstado)
      );
    });
    await Promise.all(promises);
  } catch (error) {
    console.log(error);
  }
};

const readArquivoEstado = async (uf) => {
  try {
    const cidadesUf = JSON.parse(
      await fs.readFile('./Estados/' + uf.toUpperCase() + '.json', "utf-8")
    );
    return cidadesUf;
  } catch (error) {
    console.log(error);
  }
}

const countCidades = async (uf) => {
  try {
    const cidadesUf = await readArquivoEstado(uf);
    return cidadesUf.length;
  } catch (error) {
    console.log(error);
  }
};

export const coutCidadesEstado = async () => {
  try {
    const promises = estados.map(async (estado) => {
      const { Sigla } = estado;
      const count = await countCidades(Sigla);
      jsonCountCidades = [...jsonCountCidades, { "UF": Sigla, "CountCidades": count }];
    });
    await Promise.all(promises);

    jsonCountCidades.sort((a, b) => b.CountCidades - a.CountCidades);
  } catch (error) {
    console.log(error);
  }
};

export const top5MaisCidades = async () => {
  try {
    let top5 = [];

    for (let i = 0; i < 5; i++) {
      top5.push(`${jsonCountCidades[i].UF} - ${jsonCountCidades[i].CountCidades}`);
    }
    console.log(`TOP 5 Mais cidades: ${JSON.stringify(top5)}`);
  } catch (error) {
    console.log(error);
  }
};

export const top5MenosCidades = async () => {
  try {
    let top5 = [];

    for (let i = jsonCountCidades.length - 5; i < jsonCountCidades.length; i++) {
      top5.push(`${jsonCountCidades[i].UF} - ${jsonCountCidades[i].CountCidades}`);
    }
    console.log(`TOP 5 Menos cidades: ${JSON.stringify(top5)}`);
  } catch (error) {
    console.log(error);
  }
};

const maiorNomeCidade = async (uf) => {
  try {
    const cidadesUf = await readArquivoEstado(uf);
    const maiorNome = cidadesUf
      .sort((a, b) => a.Nome.localeCompare(b.Nome))
      .sort((a, b) => b.Nome.length - a.Nome.length)[0];
    console.log(maiorNome.Nome);

    return maiorNome.Nome;
  } catch (error) {
    console.log(error);
  }
};

const maiorNomeCidadeEstado = async () => {
  try {
    for (let i = 0; i < estados.length; i++) {
      const cidade = await maiorNomeCidade(estados[i].Sigla);
      jsonMaiorNomeCidade = [...jsonMaiorNomeCidade, { "Cidade": cidade, "UF": estados[i].Sigla }];
    }
  } catch (error) {
    console.log(error);
  }
};

export const printMaioresNomesCidades = async () => {
  try {
    let maioresNomes = [];
    jsonMaiorNomeCidade.forEach(cidadeUf => {
      maioresNomes.push(`${cidadeUf.Cidade} - ${cidadeUf.UF}`);
    });

    console.log(`Maior nome de Cidade para cada Estado: 
    ${JSON.stringify(maioresNomes)}`);
  } catch (error) {
    console.log(error);
  }
};

const menorNomeCidade = async (uf) => {
  try {
    const cidadesUf = await readArquivoEstado(uf);
    const menorNome = cidadesUf
      .sort((a, b) => a.Nome.localeCompare(b.Nome))
      .sort((a, b) => a.Nome.length - b.Nome.length)[0];
    return menorNome.Nome;
  } catch (error) {
    console.log(error);
  }
};

const menorNomeCidadeEstado = async () => {
  try {
    for (let i = 0; i < estados.length; i++) {
      const cidade = await menorNomeCidade(estados[i].Sigla);
      jsonMenorNomeCidade = [...jsonMenorNomeCidade, { "Cidade": cidade, "UF": estados[i].Sigla }];
    }
  } catch (error) {
    console.log(error);
  }
};

export const printMenoresNomesCidades = async () => {
  try {
    let menoresNomes = [];
    jsonMenorNomeCidade.forEach(cidadeUf => {
      menoresNomes.push(`${cidadeUf.Cidade} - ${cidadeUf.UF}`);
    });
    console.log(`Menor nome de Cidade para cada Estado: 
    ${JSON.stringify(menoresNomes)}`);
  } catch (error) {
    console.log(error);
  }
};

export const printMaiorNomeTodasCidade = async () => {
  try {
    let maior = [];
    maior = jsonMaiorNomeCidade
      .sort((a, b) => a.Cidade.localeCompare(b.Cidade))
      .sort((a, b) => b.Cidade.length - a.Cidade.length)[0];
    console.log(
      `Maior nome de todas as Cidades: ${maior.Cidade} - ${maior.UF}`);
  } catch (error) {
    console.log(error);
  }
};

export const printMenorNomeTodasCidade = async () => {
  try {
    let menor = [];
    menor = jsonMenorNomeCidade
      .sort((a, b) => a.Cidade.localeCompare(b.Cidade))
      .sort((a, b) => a.Cidade.length - b.Cidade.length)[0];
    console.log(
      `Menor nome de todas as Cidades: ${menor.Cidade} - ${menor.UF}`);
  } catch (error) {
    console.log(error);
  }
};