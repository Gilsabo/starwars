import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Starship } from '../App';

export default function Starships() {
  const { isPending, error, data } = useQuery({
    queryKey: ['starshipsData'],
    queryFn: () =>
      fetch('https://swapi.py4e.com/api/starships/?page=1').then((res) =>
        res.json(),
      ),
  });

  if (data) {
    console.log(data);
  }

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred' + error.message;

  const starshipUrlIds: string = data.results.map((ship: Starship) => {
    const extractId = ship.url.split('/');
    return extractId[extractId.length - 2];
  });

  return (
    <main>
      <section>
        <ul>
          {data.results.map((starship: Starship, index: number) => (
            <Link key={`div-${starship.name}`} to={`${starshipUrlIds[index]}`}>
              <li>{starship.name}</li>
              <li>{starship.model}</li>
            </Link>
          ))}
        </ul>
      </section>
    </main>
  );
}
