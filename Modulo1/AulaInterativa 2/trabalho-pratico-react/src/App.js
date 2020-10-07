import React from 'react';

function App() {
  // const red = React.useState(0);
  // const redValue = red[0];
  // const redFunction = red[1];
  const [red, setRed] = React.useState(0);
  const [green, setGreen] = React.useState(100);
  const [blue, setBlue] = React.useState(255);

  const handleInputChance = ({ target }) => {
    const { id } = target;
    const value = parseInt(target.value, 10);
    switch (id) {
      case 'red':
        setRed(value);
        break;

      case 'green':
        setGreen(value);
        break;

      case 'blue':
        setBlue(value);
        break;
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h1>Trabalho Pratico com Ract</h1>
      <div>
        Red
        <input
          id="red"
          type="range"
          min="0"
          max="255"
          value={red}
          onChange={handleInputChance}
        />
        <input type="text" disabled value={red} readOnly />
      </div>
      <div>
        Grenn
        <input
          id="green"
          type="range"
          min="0"
          max="255"
          value={green}
          onChange={handleInputChance}
        />
        <input type="text" disabled value={green} readOnly />
      </div>
      <div>
        Blue
        <input
          id="blue"
          type="range"
          min="0"
          max="255"
          value={blue}
          onChange={handleInputChance}
        />
        <input type="text" disabled value={blue} readOnly />
      </div>
      <div
        className="square"
        style={{ backgroundColor: `rgb(${red},${green},${blue})` }}
      ></div>
    </div>
  );
}

export default App;
