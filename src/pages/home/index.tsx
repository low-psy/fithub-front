import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActionFunctionArgs,
  Link,
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import {
  getTraining,
  getNextPageData,
  getUsersTrainingLikes,
  postSearchTraining,
} from '../../apis/trainig';
import FilterSection from '../../components/btn/LinkBtnWithUrl';
import lookupFilter from '../../assets/lookupFilter.png';
import mapFilter from '../../assets/mapFilter.png';
import newpostFilter from '../../assets/newpostFilter.png';
import FilterIcon from '../../assets/icons/filterIcon';
import { TrainingOutlineDto } from '../../types/swagger/model/trainingOutlineDto';
import { PageTrainingOutlineDto } from '../../types/swagger/model/pageTrainingOutlineDto';
import { errorFunc, isRefreshResData, setRefreshToken } from '../../utils/util';
import { refreshResData } from '../../types/common';
import { useAppSelector } from '../../hooks/reduxHooks';
import useModal from '../../hooks/useModal';
import DefaultModal from '../../components/modal/DefaultModal';
import TrainingFilter from './TrainingFilter';
import UndefinedCover from '../../components/common/UndefinedCover';

export type CategoryEnum = 'PILATES' | 'HEALTH' | 'PT' | 'CROSSFIT' | 'YOGA';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const keyword = url.searchParams.get('searchInput') || undefined;
  const lowestPrice = Number(url.searchParams.get('lowestPrice')) || undefined;
  const highestPrice =
    Number(url.searchParams.get('highestPrice')) || undefined;
  const startDate = url.searchParams.get('startDate') || undefined;
  const endDate = url.searchParams.get('endDate') || undefined;
  const category =
    (url.searchParams.get('category') as CategoryEnum) || undefined;
  try {
    let response;
    if (
      keyword ||
      lowestPrice ||
      highestPrice ||
      startDate ||
      endDate ||
      category
    ) {
      response = await postSearchTraining({
        conditions: {
          keyword,
          lowestPrice,
          highestPrice,
          startDate,
          endDate,
          category,
        },
        pageable: { page: 0, size: 10 },
      });
    } else {
      response = await getTraining();
    }
    if (response.status === 200) {
      return response;
    }
    if (response.status === 201) {
      const { accessToken } = response.data as refreshResData;
      setRefreshToken(accessToken);
      return redirect('');
    }
  } catch (err) {
    const status = errorFunc(err);
    console.log(status);
    redirect('/login');
  }
  return null;
};

const categoryArray = [
  { name: '전체', value: 'ALL' },
  { name: 'PT', value: 'PT' },
  { name: '요가', value: 'YOGA' },
  { name: '필라테스', value: 'PILATES' },
  { name: '크로스핏', value: 'CROSSFIT' },
];

const Home: React.FC = () => {
  const response = useLoaderData() as AxiosResponse<PageTrainingOutlineDto>;
  const pageTrainersTraining = useMemo(() => response.data, [response.data]);
  const trainingInfo = pageTrainersTraining.content;
  const idList = useMemo(
    () => trainingInfo?.map((training) => training.id as number),
    [trainingInfo],
  );
  const dispatch = useDispatch();
  const [usersTrainingLike, setUsersTrainingLike] = useState<boolean[]>([]);
  const { isLogin } = useAppSelector((state) => state.user);
  const navigation = useNavigation();
  const filterModal = useModal();
  const [selectCategory, setSelectCategory] = useState<string>('ALL');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchUsersTrainingLike = async () => {
      if (navigation.state === 'loading') {
        return;
      }
      try {
        if (!idList) return;
        const res = await getUsersTrainingLikes(idList);
        if (res.status === 200) {
          setUsersTrainingLike(res.data);
          return null;
        }
        if (res.status === 201) {
          if (isRefreshResData(res.data)) {
            const { accessToken } = res.data as refreshResData;
            setRefreshToken(accessToken);
          }
        }
      } catch (err) {
        errorFunc(err);
      }
    };
    if (isLogin) {
      fetchUsersTrainingLike();
    }
  }, [idList, dispatch, isLogin, navigation.state]);

  const [last, setLast] = useState<boolean>(
    pageTrainersTraining.last as boolean,
  );

  const fetchData = useCallback(
    async (page: number): Promise<TrainingOutlineDto[] | []> => {
      if (last) {
        return [];
      }
      try {
        const nextPageData = await getNextPageData(page);
        if (nextPageData.status === 200) {
          setLast(nextPageData.data.last as boolean);
          return nextPageData.data.content || [];
        }
        return [];
      } catch (err) {
        errorFunc(err);
        return [];
      }
    },
    [last],
  );

  const categoryFilterHandler = (category: string, index: number) => {
    setSelectCategory(category);
    if (category === 'ALL') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryArray[index].value);
    }
    setSearchParams(searchParams);
  };

  return (
    <>
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
            <div className="items-center gap-x-4 space-y-6 md:flex md:space-y-0">
              <p className="shrink-0  text-2xl font-bold">
                이런 <span className="text-main">트레이닝</span>은 어떠세요?
              </p>
              <div className="flex gap-x-3 text-2xl font-extrabold text-stone-400">
                {categoryArray.map((category, index) => {
                  const isSelected = selectCategory === category.value;
                  return (
                    <button
                      type="button"
                      key={category.value}
                      className={`hover:text-black ${isSelected && 'text-black'}`}
                      onClick={() =>
                        categoryFilterHandler(category.value, index)
                      }
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              className="hidden gap-4 rounded-xl bg-slate-200 px-6 py-4 drop-shadow-sm md:flex"
              onClick={() => filterModal.toggle()}
            >
              <FilterIcon />
              필터
            </button>
          </article>
          {!trainingInfo ||
            (trainingInfo.length < 1 && (
              <div className="relative h-[300px] w-full bg-gray-100">
                <UndefinedCover>생성한 트레이닝이 없습니다</UndefinedCover>
              </div>
            ))}
          <Outlet
            context={{ trainingInfo, fetchData, last, usersTrainingLike }}
          />
        </section>
      </div>
      <DefaultModal
        isOpen={filterModal.isOpen}
        onClose={filterModal.toggle}
        className="my-4 h-full"
      >
        <TrainingFilter onClose={filterModal.toggle} />
      </DefaultModal>
      {trainingInfo && trainingInfo.length > 1 && (
        <Link
          to="/map"
          className="fixed bottom-14 left-1/2 flex -translate-x-1/2 gap-x-1 rounded-full bg-purple-300 px-4 py-4 font-bold text-white drop-shadow-md"
        >
          <span className="material-symbols-rounded">location_on</span>
          현재 위치 주변 검색하기
        </Link>
      )}
    </>
  );
};
export default Home;

export const action = ({ request }: ActionFunctionArgs) => {
  return null;
};
