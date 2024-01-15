import React from 'react';
import {
  ActionFunctionArgs,
  LoaderFunction,
  json,
  useLoaderData,
} from 'react-router-dom';
import { getTraining, getNextPageData } from '../../apis/trainig';
import FilterSection from '../../components/item/LinkItemWithBg';
import lookupFilter from '../../assets/lookupFilter.png';
import mapFilter from '../../assets/mapFilter.png';
import newpostFilter from '../../assets/newpostFilter.png';
import FilterIcon from '../../assets/icons/filterIcon';
import MainSection from '../../components/item/TrainerItem';
import { LoaderData, TrainerData } from '../../types/training';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import { createFakeData } from '../../types/trainingClass';

export const loader = (async () => {
  const { data, status } = await getTraining();

  if (status === 201) {
    return null;
  }

  if (status === 404) {
    throw json({ message: '홈페이지 로딩에 실패했습니다' }, { status: 404 });
  }

  return data;
}) satisfies LoaderFunction;

const Home: React.FC = () => {
  let trainerInfoDto = useLoaderData() as LoaderData<typeof loader>;
  trainerInfoDto = createFakeData();

  const { data, loaderIndicator } = useInfiniteScroll<TrainerData>({
    initialData: trainerInfoDto?.content || [],
    fetchData: async (page) => {
      const nextPageData = await getNextPageData(page);
      if (!nextPageData) {
        return [];
      }
      return nextPageData.content;
    },
  });

  return (
    <div className="space-y-4 md:space-y-10">
      <section className="hidden h-56 grid-cols-2 gap-3  md:grid">
        <div className="row-span-2  flex ">
          <FilterSection bg={lookupFilter} to="/post">
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
      <section className="space-y-4">
        <article className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            이런 <span className="text-main">트레이닝</span>은 어떠세요?
          </h2>
          <button
            type="button"
            className="hidden gap-4 rounded-xl bg-slate-200 px-6 py-4 drop-shadow-sm md:flex"
          >
            <FilterIcon />
            필터
          </button>
        </article>
        <article>
          <ul className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {data.map((value) => (
              <MainSection key={value.id} trainerInfoDto={value} />
            ))}
          </ul>
          <div ref={loaderIndicator} />
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
