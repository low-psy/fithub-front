import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActionFunctionArgs,
  Link,
  Outlet,
  useAsyncValue,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { getNextPageData, getUsersTrainingLikes } from 'apis/trainig';
import FilterSection from 'components/btn/LinkBtnWithUrl';
import lookupFilter from 'assets/lookupFilter.png';
import mapFilter from 'assets/mapFilter.png';
import newpostFilter from 'assets/newpostFilter.png';
import trainerFilter from 'assets/trainerFilter.png';
import FilterIcon from 'assets/icons/filterIcon';
import { TrainingOutlineDto } from 'types/swagger/model/trainingOutlineDto';
import { PageTrainingOutlineDto } from 'types/swagger/model/pageTrainingOutlineDto';
import { errorFunc, isRefreshResData, setRefreshToken } from 'utils/util';
import { refreshResData } from 'types/common';
import { useAppSelector } from 'hooks/reduxHooks';
import useModal from 'hooks/useModal';
import DefaultModal from 'components/modal/DefaultModal';
import UndefinedCover from 'components/common/UndefinedCover';
import TrainingFilter from './TrainingFilter';
import TrainerFilter from '../searchTrainer/TrainerFilter';

export type CategoryEnum = 'PILATES' | 'HEALTH' | 'PT' | 'CROSSFIT' | 'YOGA';

const categoryArray = [
  { name: '전체', value: 'ALL' },
  { name: 'PT', value: 'PT' },
  { name: '요가', value: 'YOGA' },
  { name: '필라테스', value: 'PILATES' },
  { name: '크로스핏', value: 'CROSSFIT' },
];

const HomePage: React.FC = () => {
  const response = useAsyncValue() as AxiosResponse<PageTrainingOutlineDto>;
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
  const trainerModal = useModal();
  const [selectCategory, setSelectCategory] = useState<string>('ALL');

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
  }, [idList, dispatch, isLogin]);

  const [last, setLast] = useState<boolean>(
    pageTrainersTraining.last as boolean,
  );
  const [page, setPage] = useState<number>(1);

  const fetchData = useCallback(
    async (page: number): Promise<TrainingOutlineDto[] | []> => {
      if (last) {
        return [];
      }
      try {
        const nextPageData = await getNextPageData(page);
        if (nextPageData.status === 200) {
          setLast(nextPageData.data.last as boolean);
          setPage(page);
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
  const navigate = useNavigate();
  const categoryFilterHandler = (category: string, index: number) => {
    setSelectCategory(category);
    if (category === 'ALL') {
      return navigate('/');
    }
    navigate(`/?category=${categoryArray[index].value}`);
  };

  const mapTo = isLogin ? '/mapList' : '/login';
  const postWriteTo = isLogin ? 'newPost' : '/login';

  return (
    <>
      <div className="">
        <section className="mb-8  grid h-56  grid-cols-2 gap-3">
          <div className=" flex  ">
            <FilterSection bg={lookupFilter} to="/post">
              게시글 조회
            </FilterSection>
          </div>
          <div className=" flex">
            <FilterSection bg={newpostFilter} to={postWriteTo}>
              게시글 작성
            </FilterSection>
          </div>
          <div className=" flex ">
            <button
              type="button"
              style={{ backgroundImage: `url(${trainerFilter})` }}
              className="bg flex h-full w-full items-center justify-center rounded-xl bg-cover bg-center text-2xl font-extrabold text-white drop-shadow-2xl xl:text-3xl "
              onClick={() => trainerModal.toggle()}
            >
              트레이너 검색
            </button>
          </div>
          <div className=" flex  ">
            <FilterSection bg={mapFilter} to={mapTo}>
              헬스장 조회
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
            context={{ trainingInfo, fetchData, last, usersTrainingLike, page }}
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
      <DefaultModal isOpen={trainerModal.isOpen} onClose={trainerModal.toggle}>
        <TrainerFilter onClose={trainerModal.toggle} />
      </DefaultModal>
      {trainingInfo && trainingInfo.length > 0 && (
        <Link
          to="/map?fromHomePage=true"
          className="fixed bottom-14 left-1/2 flex -translate-x-1/2 gap-x-1 rounded-full bg-purple-300 px-4 py-4 font-bold text-white drop-shadow-md"
          state={{ fromHomePage: true }}
        >
          <span className="material-symbols-rounded">location_on</span>
          현재 위치 주변 검색하기
        </Link>
      )}
    </>
  );
};
export default HomePage;

export const action = ({ request }: ActionFunctionArgs) => {
  return null;
};
