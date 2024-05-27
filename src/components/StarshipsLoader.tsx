import { useInfiniteQuery } from '@tanstack/react-query';

// import { Link } from 'react-router-dom';
// import { Starship } from '../App';
// import { getStarships } from '../utils/apis';

type Page = {
  name: string;
  model: string;
};

export default function Starships() {
  // const { isPending, error, data } = useQuery({
  //   queryKey: ['starshipsData'],
  //   queryFn: () => getStarships(),
  // });

  // if (isPending) return 'Loading...';
  // if (error) return 'An error has occurred' + error.message;

  // const starshipUrlIds: string = data.results.map((ship: Starship) => {
  //   const extractId = ship.url.split('/');
  //   return extractId[extractId.length - 2];
  // });

  // return (
  //   <main>
  //     <section>
  //       <ul>
  //         {data.results.map((starship: Starship, index: number) => (
  //           <Link key={`div-${starship.name}`} to={`${starshipUrlIds[index]}`}>
  //             <li>{starship.name}</li>
  //             <li>{starship.model}</li>
  //           </Link>
  //         ))}
  //       </ul>
  //       <button> view more</button>
  //     </section>
  //   </main>
  // );

  const getStarshipsWithPagination = async (pageParam: number) => {
    const response = await fetch(
      `http:///posts?_page=${pageParam}&_sort=title&_limit=2`,
    );
    const data = await response.json();
    const totalCount = parseInt(
      response.headers.get('x-total-count') || '0',
      10,
    );
    const hasNext = pageParam * 2 < totalCount;

    return {
      nextPage: hasNext ? pageParam + 1 : undefined,
      previousPage: pageParam > 1 ? pageParam - 1 : undefined,
      results: data, // assuming `data` is the array of starships
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
  console.log(data?.pages);
  console.log(data?.pageParams, 'params');

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <ul>
        {data.pages.map((page) =>
          page.results.map((starship: Page) => (
            <div key={`div-starship-${starship.name}`}>
              {starship.name} - {starship.model}
            </div>
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
