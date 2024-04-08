import { Link, LoaderFunction, useLoaderData } from 'react-router-dom';
import { getTrainers } from '../../apis/trainer';
import UndefinedCover from '../../components/common/UndefinedCover';
import { LoaderData } from '../../types/common';
import { errorFunc } from '../../utils/util';
import ReservationItem from '../trainer/ReservationItem';

export const loader = (async ({ request }) => {
  const url = new URL(request.url);
  const interest = url.searchParams.get('interest') || undefined;
  const keyword = url.searchParams.get('name') || undefined;
  const gender = url.searchParams.get('gender') || undefined;
  try {
    const req = await getTrainers({
      page: 0,
      size: 10,
      sort: ['id', 'desc'],
      gender,
      interest,
      keyword,
    });
    if (req.status === 200) {
      return req;
    }
    throw new Error('server is trouble');
  } catch (error) {
    errorFunc(error);
  }
}) satisfies LoaderFunction;

const TrainerExplore = () => {
  console.log('home trainer explore');
  const req = useLoaderData() as LoaderData<typeof loader>;
  const data = req?.data.content;
  return (
    <div>
      {data && data.length !== 0 ? (
        <>
          <h2 className="text-2xl font-extrabold">사용자 맞춤 트레이너 추천</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {data.map(
              ({ address, bio, email, id, interests, name, profileUrl }) => {
                return (
                  <Link
                    key={id}
                    className="rounded-xl bg-white p-8 shadow-lg hover:opacity-100"
                    to={`/search/trainer/${id}`}
                  >
                    <div className="flex justify-center">
                      <div className=" aspect-square h-[200px]  ">
                        <img
                          alt="trainer"
                          src={profileUrl}
                          className="h-full w-full rounded-full"
                        />
                      </div>
                    </div>
                    <p className="mb-6  mt-4 truncate text-2xl font-extrabold">
                      {name}
                    </p>
                    <div className="space-y-4">
                      <ReservationItem
                        title="이메일"
                        value={email}
                        iconString="mail"
                      />
                      <ReservationItem
                        title="성별"
                        value={bio}
                        iconString={bio === 'F' ? 'woman' : 'man'}
                      />
                      <ReservationItem
                        title="주소"
                        value={address}
                        iconString="home"
                      />
                      <ReservationItem
                        title="카테고리"
                        value={interests?.[0]}
                        iconString="sell"
                      />
                    </div>
                  </Link>
                );
              },
            )}
          </div>
        </>
      ) : (
        <div className="relative h-[300px] w-full bg-slate-200">
          <UndefinedCover>현재 등록된 트레이너가 없습니다</UndefinedCover>
        </div>
      )}
    </div>
  );
};

export default TrainerExplore;
