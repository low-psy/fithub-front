import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActionFunctionArgs,
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
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
import useInfiniteScroll from '../../hooks/infiniteScroll';
import { TrainingOutlineDto } from '../../types/swagger/model/trainingOutlineDto';
import { PageTrainingOutlineDto } from '../../types/swagger/model/pageTrainingOutlineDto';
import { errorFunc, isRefreshResData, setRefreshToken } from '../../utils/util';
import { refreshResData } from '../../types/common';
import { useAppSelector } from '../../hooks/reduxHooks';
import useModal from '../../hooks/useModal';
import DefaultModal from '../../components/modal/DefaultModal';
import TrainingFilter from './TrainingFilter';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const keyword = url.searchParams.get('searchInput');
  const lowestPrice = url.searchParams.get('lowestPrice');
  const highestPrice = url.searchParams.get('highestPrice');
  const startDate = url.searchParams.get('startDate');
  const endDate = url.searchParams.get('endDate');
  try {
    let response;
    if (keyword || lowestPrice || highestPrice || startDate || endDate) {
      response = await postSearchTraining({
        conditions: {
          keyword,
          lowestPrice: Number(10),
          highestPrice: Number(20),
          startDate,
          endDate,
        },
        pageable: { page: 0, size: 1 },
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

  return (
    <>
      <div className="space-y-4 md:space-y-10">
        <section className="hidden h-56 grid-cols-2 gap-3  md:grid">
          <div className="row-span-2  flex ">
            <FilterSection bg={lookupFilter} to="/post/home">
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
              onClick={() => filterModal.toggle()}
            >
              <FilterIcon />
              필터
            </button>
          </article>
          <Outlet
            context={{ trainingInfo, fetchData, last, usersTrainingLike }}
          />
        </section>
      </div>
      <DefaultModal isOpen={filterModal.isOpen} onClose={filterModal.toggle}>
        <TrainingFilter onClose={filterModal.toggle} />
      </DefaultModal>
    </>
  );
};
export default Home;

export const action = ({ request }: ActionFunctionArgs) => {
  return null;
};
