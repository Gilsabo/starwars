import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Films from './Films';
import Pilots from './Pilots';

export default function Starship() {
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ['starshipInfo'],
    queryFn: () =>
      fetch(`https://swapi.py4e.com/api/starships/${id}`).then((res) =>
        res.json(),
      ),
  });

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred' + error.message;

  console.log(data);

  return (
    <>
      <div>Starhisp {id}</div>
      <div>{data.name}</div>
      <div>{data.model}</div>
      <div>{data.created}</div>
      <div>{data.MGLT}</div>
      <Pilots pilots={data.pilots} />
      <Films films={data.films} />
    </>
  );
}
