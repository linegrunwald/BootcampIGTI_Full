'use strict'; //o Javascript acusa mais erros

console.log('Hello');

// var x let

//var tem escopo abrangente
//let tem escopo reduzido

function withVar() {
  for (var i = 0; i < 10; i++) {
    console.log('var' + i);
  }

  i = 20;
  console.log(i);
}

function withLet() {
  for (let i = 0; i < 10; i++) {
    console.log('var' + i);
  }

  //i = 20;
  //console.log(i);
}

withVar();
withLet();

//const - não podemos reatribuir valores
const c = 20;
//c = 20; //não pode fazer isso com const

const d = [];
console.log(d);

d.push(1);
console.log(d);

function sum(a, b) {
  return a + b;
}

//função anônima
const sum2 = function (a, b) {
  return a + b;
};

//arrow function
const sum3 = (a, b) => {
  return a + b;
};

//arrow function reduzida
const sum4 = (a, b) => a + b;

console.log(sum(2, 3));
console.log(sum2(2, 3));
console.log(sum3(2, 3));
console.log(sum4(2, 3));

//templete literals

const name = 'Aline';
const surName = 'Grunwald de Sousa';
const text1 = 'Meu nome é ' + name + ' ' + surName;

const text2 = `Meu nome é ${name} ${surName}`;

console.log(text1);
console.log(text2);

const sum5 = (a, b = 10) => a + b;
console.log(sum5(2));
console.log(sum5(2, 8));
