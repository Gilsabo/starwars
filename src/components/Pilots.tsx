import { useQueries } from '@tanstack/react-query';
import { getPilotName } from '../utils/apis';

type Props = {
  pilots: string[];
};

export default function Pilots(props: Props) {
  const pilotsUrlIds = props.pilots.map((pilot) => {
    const extractId = pilot.split('/');
    return extractId[extractId.length - 2];
  });

  console.log(pilotsUrlIds, props.pilots);

  const fetchPilotsNames = useQueries({
    queries: pilotsUrlIds.map((pilotsId, index) => {
      return {
        queryKey: ['user', pilotsId],
        queryFn: () => getPilotName(pilotsUrlIds[index]),
      };
    }),
  });
  console.log(fetchPilotsNames);
  return (
    <>
      <div>Pilots</div>
      {fetchPilotsNames.length !== 0 ? (
        fetchPilotsNames.map((pilotName) => (
          <div key={`div${pilotName.data?.name as string}`}>
            {pilotName.data?.name}
          </div>
        ))
      ) : (
        <div>no pilots</div>
      )}
    </>
  );
}
