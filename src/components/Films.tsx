import { useQueries } from '@tanstack/react-query';
import { getFilm } from '../utils/apis';

type Props = {
  films: string[];
};

export default function Films(props: Props) {
  const filmsUrlIds = props.films.map((film) => {
    const extractId = film.split('/');
    return extractId[extractId.length - 2];
  });

  const fetchFilmsInfos = useQueries({
    queries: filmsUrlIds.map((filmId, index) => {
      return {
        queryKey: ['user', filmId],
        queryFn: () => getFilm(filmsUrlIds[index]),
      };
    }),
  });

  return (
    <div>
      <div>films</div>
      {fetchFilmsInfos.map((filmInfo) => (
        <div key={`div${filmInfo.data?.title as string}`}>
          <div>{filmInfo.data?.title}</div>
          {filmInfo.data?.episode_id && (
            <div>Episode {filmInfo.data?.episode_id}</div>
          )}
        </div>
      ))}
    </div>
  );
}
