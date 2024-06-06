export async function getStarships() {
  return await fetch('https://swapi.py4e.com/api/starships/?page=1').then(
    (res) => res.json(),
  );
}

export async function getFilm(id: string | undefined) {
  return await fetch(`https://swapi.py4e.com/api/films/${id}/`).then((res) =>
    res.json(),
  );
}

export async function getPilotName(id: string | undefined) {
  return await fetch(`https://swapi.py4e.com/api/people/${id}/`).then((res) =>
    res.json(),
  );
}

export const getStarshipsWithPagination = async (pageParam: number) => {
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
