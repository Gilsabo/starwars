import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Starship } from '../App';
import { getStarshipsWithPagination } from '../utils/apis';

export default function Starships() {
  const { data, error, fetchNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['starships', 'infinite'],
      queryFn: ({ pageParam = 1 }) => getStarshipsWithPagination(pageParam),
      initialPageParam: 1,
      getNextPageParam: (prevData) => prevData.nextPage,
    });

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <ul>
        {data.pages.flatMap((page) =>
          page.results.map((starship: Starship) => {
            const extractId = starship.url.split('/');
            const starshipId = extractId[extractId.length - 2];

            return (
              <Link key={`div-${starshipId}`} to={`${starshipId}`}>
                <li>{starship.name}</li>
                <li>{starship.model}</li>
              </Link>
            );
          }),
        )}
      </ul>
      <button
        onClick={async () => {
          await fetchNextPage();
        }}
      >
        {isFetchingNextPage ? 'Loading...' : 'Load more'}
      </button>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  );
}
