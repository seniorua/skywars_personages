import { useEffect, useState } from "react";

export const App = () => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(80);
  const [personage, setPersonage] = useState({});
  const up = () => {
    setNumber((prev) => {
      if (prev === count) return prev;
      return prev + 1;
    });
  };

  const down = () => {
    setNumber((prev) => {
      if (prev === 1) return 1;
      return prev - 1;
    });
  };

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/`)
      .then((data) => data.json())
      .then((data) => {
        setCount(data.count);
      });
  }, []);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${number}`)
      .then((data) => data.json())
      .then((data) => {
        setPersonage((prev) => {
          const temp = { ...prev };
          temp.name = data.name;
          temp.height = data.height;
          temp.mass = data.mass;
          temp.skin_color = data.skin_color;
          return temp;
        });
      });
  }, [number]);
  return (
    <div className="app">
      <div className="skywars">
        <div className="navigation">
          <button className="minus" onClick={down}>
            -
          </button>
          <input className="number" type="text" value={number} />
          <button className="plus" onClick={up}>
            +
          </button>
        </div>
        <div className="data">
          <div className="sides title">
            <span>Name: </span>
            <span>Height: </span>
            <span>Mass: </span>
            <span>Skin_color: </span>
          </div>
          <div className="sides">
            <span>{personage.name}</span>
            <span>{personage.height}</span>
            <span>{personage.mass}</span>
            <span>{personage.skin_color}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
