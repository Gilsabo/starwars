type Props = {
  pilots: string[];
};

export default function Pilots(props: Props) {
  return (
    <>
      <div>Pilots</div>
      <div>{props.pilots}</div>
    </>
  );
}
