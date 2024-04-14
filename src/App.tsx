import './App.css';
import { useEffect, useState } from 'react';

interface Starship {
  name: string;
  model: string;
}

export default function App() {
  const [ships, setShips] = useState<Starship[]>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://swapi.py4e.com/api/starships/?page=1',
        );
        const shipsInfo = await response.json();
        setShips(shipsInfo.results);
        console.log('ships', shipsInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(ships);
  return (
    <div>
      <h1>hi!</h1>
      <h2>Starhsips</h2>
      {ships?.map((ship) => (
        <ul key={`div-${ship.name}`}>
          <li>{ship.name}</li>
          <li>{ship.name}</li>
        </ul>
      ))}
    </div>
  );
}
