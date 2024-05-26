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
    const res = await fetch(
      `https://swapi.dev/api/starships/?page=${pageParam}`,
    );
    return res.json();
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
    queryFn: ({ pageParam = 1 }) => getStarshipsWithPagination(pageParam + 1),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
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
