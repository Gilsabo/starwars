export async function getStarships() {
  return await fetch('https://swapi.py4e.com/api/starships/?page=1').then(
    (res) => res.json(),
  );
}
