import { AxiosResponse } from 'axios';
import SingleMap from 'components/map/SingleMap';
import { useEffect, useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { TrainerOutlineDto } from 'types/swagger/model/trainerOutlineDto';
import { addressToPositions } from 'utils/util';

export default function TrainerLocation() {
  const {
    data: { address },
  } = useAsyncValue() as AxiosResponse<TrainerOutlineDto>;
  const [location, setLocation] = useState<{ lat: number; lng: number }>();
  useEffect(() => {
    const func = async () => {
      if (address) {
        const position = await addressToPositions(address);
        setLocation(position);
      }
    };
    func();
  }, [address]);
  return (
    <div>
      <h2 className="mb-2 text-2xl font-extrabold">위치</h2>
      <div className="rounded-xl border-[1.5px] border-sub bg-white p-8">
        <div className="font-bold">{address}</div>
        <div className="mt-4 aspect-square max-w-[450px] space-y-4">
          <SingleMap isMarker location={location} level={5} />
        </div>
      </div>
    </div>
  );
}
