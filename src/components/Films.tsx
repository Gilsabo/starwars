type Props = {
  films: string[];
};

export default function Films(props: Props) {
  return (
    <div>
      <div>films</div>
      {props.films.map((film) => (
        <div key={`div${film}`}>{film}</div>
      ))}
    </div>
  );
}
