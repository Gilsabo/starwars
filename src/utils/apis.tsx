export async function getStarships() {
  return await fetch('https://swapi.py4e.com/api/starships/?page=1').then(
    (res) => res.json(),
  );
}

export async function getFilm(id: string | undefined) {
  return await fetch(`https://swapi.py4e.com/api/films/${id}`).then((res) =>
    res.json(),
  );
}
