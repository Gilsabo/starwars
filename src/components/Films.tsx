type Props = {
  films: string[];
};

export default function Films(props: Props) {
  const filmsUrlIds = props.films.map((film) => {
    const extractId = film.split('/');
    return extractId[extractId.length - 2];
  });

  console.log(filmsUrlIds);

  return (
    <div>
      <div>films</div>
      {props.films.map((film) => (
        <div key={`div${film}`}>{film}</div>
      ))}
    </div>
  );
}
