import React from 'react';
import {
  ActionFunctionArgs,
  LoaderFunction,
  json,
  useLoaderData,
} from 'react-router-dom';
import getTraining from '../../apis/trainig';
import FilterSection from '../../components/item/LinkItemWithBg';
import lookupFilter from '../../assets/lookupFilter.png';
import mapFilter from '../../assets/mapFilter.png';
import newpostFilter from '../../assets/newpostFilter.png';
import FilterIcon from '../../assets/icons/filterIcon';
import MainSection from '../../components/item/GridItem';
import { LoaderData } from '../../types/training';

export const loader = (async () => {
  const { data, status } = await getTraining();

  if (status === 404) {
    throw json({ message: '홈페이지 로딩에 실패했습니다' }, { status: 404 });
  }

  return data;
}) satisfies LoaderFunction;

const Home: React.FC = () => {
  const trianerInfoDto = useLoaderData() as LoaderData<typeof loader>;

  return (
    <div className="space-y-10">
      <section className="grid h-56 grid-cols-2  gap-3">
        <div className="row-span-2  flex ">
          <FilterSection bg={lookupFilter} to="/lookup">
            운동 게시글 조회하기
          </FilterSection>
        </div>
        <div className=" flex">
          <FilterSection bg={newpostFilter} to="newpost">
            게시글 작성하기
          </FilterSection>
        </div>
        <div className=" flex ">
          <FilterSection bg={mapFilter} to="map">
            지도에서 찾아보기
          </FilterSection>
        </div>
      </section>
      <section>
        <article className="flex items-center justify-between ">
          <h2 className="text-2xl font-bold">
            이런 <span className="text-main">트레이닝</span>은 어떠세요?
          </h2>
          <button
            type="button"
            className="flex gap-4 rounded-xl bg-slate-200 px-6 py-4 drop-shadow-sm"
          >
            <FilterIcon />
            필터
          </button>
        </article>
        <article>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3  xl:grid-cols-4">
            {trianerInfoDto.content.map((value) => {
              return <MainSection trainerInfoDto={value} />;
            })}
          </ul>
        </article>
      </section>
    </div>
  );
};
export default Home;

export const action = ({ request }: ActionFunctionArgs) => {
  console.log(request);
  return null;
};
