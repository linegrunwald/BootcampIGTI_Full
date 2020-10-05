'use strict';

window.addEventListener('load', () => {
  doSpread();
  doRest();
  doDestructuring();
});

function doSpread() {
  const marriedMen = people.results.filter(
    (person) => person.name.title === 'Mr'
  );
  const marriedWomen = people.results.filter(
    (person) => person.name.title === 'Ms'
  );

  const marriedPeople = [...marriedMen, ...marriedWomen, { msg: 'oi' }];

  console.log(marriedMen);
  console.log(marriedWomen);
  console.log(marriedPeople);
}

function doRest() {
  console.log(infineteSum(1, 2));
  console.log(infineteSum(1, 2, 1000));
  console.log(infineteSum(1, 2, 1000, 1, 2, 3, 4, 34, 34, 34, 34, 2, 23));
}

function infineteSum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function doDestructuring() {
  const first = people.results[0];

  //Repetitivo
  //const username = first.login.username;
  //const password = first.login.password;

  const { username, password } = first.login;

  console.log(username);
  console.log(password);
}
