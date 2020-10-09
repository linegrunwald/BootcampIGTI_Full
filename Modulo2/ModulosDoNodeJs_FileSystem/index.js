import { promises as fs } from 'fs';

init();
writeReadJson();

//utilizando promises com async await
async function init() {
  try {
    await fs.writeFile('teste.txt', 'bla bla bla');
    await fs.appendFile('teste.txt', '\nTeste append file');
    const data = await fs.readFile('teste.txt', 'utf-8');
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
async function writeReadJson() {
  try {
    //escrito cxom valores iniciais
    const arrayCarros = ['Gol', 'Palio', 'Uno'];
    const objCarros = { carros: arrayCarros };
    await fs.writeFile('teste.json', JSON.stringify(objCarros));

    //fez a leiturta do conteudo atual
    const data = JSON.parse(await fs.readFile('teste.json'));

    //modificamos o conteudo
    data.carros.push('Sandero');

    //sobrescrevemos  o arquivo com o conteudo modificado
    await fs.writeFile('teste.json', JSON.stringify(data));
  } catch (error) {
    console.log(err);
  }
}

//utilizando promises
// fs.writeFile('teste.txt', 'bla bla bla')
//   .then(() => {
//     fs.appendFile('teste.txt', '\nTeste append file')
//       .then(() => {
//         fs.readFile('teste.txt', 'utf-8')
//           .then((data) => {
//             console.log(data);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//Utilizando com callbacks
/*import fs from 'fs';

fs.writeFile('teste.txt', 'bla bla bla', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('arquivo escrito com sucesso!');
    fs.appendFile('teste.txt', '\nteste append file', function (err) {
      if (err) {
        console.log(err);
      } else {
        fs.readFile('teste.txt', 'utf-8', function (err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
});*/

//Utilizando de forma sincrona (não recomendado)
// try {
//   console.log('1');
//   fs.writeFileSync('teste.txt', 'bla bla bla');
//   console.log('2');
//   const data = fs.readFileSync('teste.txt', 'utf-8');
//   console.log(data);
//   console.log('3');
// } catch (error) {
//   console.log(error);
// }
