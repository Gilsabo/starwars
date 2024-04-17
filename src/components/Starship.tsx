import { useParams } from 'react-router-dom';

export default function Starship() {
  const { id } = useParams();
  return <div>Starhisp {id}</div>;
}
