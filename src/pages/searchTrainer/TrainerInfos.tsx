import { AxiosResponse } from 'axios';
import { useAsyncValue } from 'react-router-dom';
import { TrainerOutlineDto } from 'types/swagger/model/trainerOutlineDto';

export default function TrainerInfos({ average }: { average: number }) {
  const {
    data: { address, bio, email, id, interests, name, profileUrl },
  } = useAsyncValue() as AxiosResponse<TrainerOutlineDto>;
  return (
    <div
      className="rounded-xl border-[1.5px] border-sub bg-white p-6 text-center md:min-w-[400px]"
      key={id}
    >
      <div className=" mb-4 inline-block  aspect-square h-[200px]">
        <img
          alt="trainer"
          src={profileUrl}
          className="h-full w-full rounded-full"
        />
      </div>
      <h2 className="text-xl font-bold">
        {name} <span className="text-base font-normal">트레이너</span>
      </h2>
      <h3 className=" mt-2 inline-block border-b-2 text-base text-gray-500 ">
        {address}
      </h3>
      <div className="mt-3 flex items-center justify-center">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <span
              className={`material-symbols-rounded ${typeof average === 'number' && index < average ? 'filled' : 'unfilled'} -ml-1 text-xl text-main`}
            >
              star
            </span>
          );
        })}
        <div className="ml-2 text-sm text-gray-500">{average.toFixed(1)}</div>
      </div>
      <div className="mt-4">&quot;{bio}&ldquo;</div>
      <div className="mt-4 font-bold">
        <div>
          이메일 <span className="ml-2 font-normal">{email}</span>
        </div>
        <div className="mt-1">
          관심사{' '}
          <span className="ml-2 font-normal">{interests?.join(',')}</span>
        </div>
      </div>
    </div>
  );
}
