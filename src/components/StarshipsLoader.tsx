import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Starship } from '../App';

type Page = {
  name: string;
  model: string;
};

export default function Starships() {
  const getStarshipsWithPagination = async (pageParam: number) => {
    const response = await fetch(
      `https://swapi.dev/api/starships/?page=${pageParam}`,
    );
    const data = await response.json();

    return {
      nextPage: data.next ? pageParam + 1 : undefined,
      previousPage: data.previous ? pageParam - 1 : undefined,
      results: data.results,
    };
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['starships', 'infinite'],
    queryFn: ({ pageParam = 1 }) => getStarshipsWithPagination(pageParam),
    initialPageParam: 1,
    getNextPageParam: (prevData) => prevData.nextPage,
  });

  console.log(data?.pages);
  console.log(data?.pageParams, 'params');

  const starshipUrlIds: string[] =
    data?.pages.flatMap((page) =>
      page.results.map((ship: Starship) => {
        const extractId = ship.url.split('/');
        return extractId[extractId.length - 2];
      }),
    ) || [];

  console.log('dd', starshipUrlIds);
  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <ul>
        {data.pages.map((page) =>
          page.results.map((starship: Starship, index: number) => (
            <Link key={`div-${starship.name}`} to={`${starshipUrlIds[index]}`}>
              <li>{starship.name}</li>
              <li>{starship.model}</li>
            </Link>
          )),
        )}
      </ul>
      <button
        onClick={() => {
          fetchNextPage();
        }}
      >
        {isFetchingNextPage ? 'Loading...' : 'Load more'}
      </button>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  );
}
