import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import {
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
} from 'react-router-dom';
import { postSearchLocationTraining } from '../../apis/trainig';
import { addressToPositions, errorFunc, fetchLocation } from '../../utils/util';
import { LoaderData } from '../../types/common';
import { kakaoLocation } from '../../types/map';
import EventMarkerContainer from '../../components/map/EventMarkerContainer';
import SearchInput from '../../components/form/SearchInput';
import UserTrainingItem from '../home/TrainingItem';
import { TrainingOutlineDto } from '../../types/swagger/model/trainingOutlineDto';
import UndefinedCover from '../../components/common/UndefinedCover';

interface mapTrainingData {
  trainingData: TrainingOutlineDto;
  position: kakaoLocation;
}

export const loader = (async () => {
  try {
    const { latitude, longitude } = (await fetchLocation()).coords;
    const res = await postSearchLocationTraining({ latitude, longitude });
    localStorage.setItem('lat', latitude.toString());
    localStorage.setItem('lng', longitude.toString());
    return res;
  } catch (error) {
    errorFunc(error);
    return redirect('/');
  }
}) satisfies LoaderFunction;
const UserMap = () => {
  const initialRes = useLoaderData() as LoaderData<typeof loader>;
  const initialData = useMemo(() => initialRes.data, [initialRes.data]);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [currentCenter, setCurrentCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });
  const [originalData, setOriginalData] = useState<mapTrainingData[]>([]);
  const [mapTrainingData, setMapTrainingData] = useState<mapTrainingData[]>([]);
  const [selectBtn, setSelectBtn] = useState<string | null>(null);

  const dataWithPositionHandler = async (initialData: TrainingOutlineDto[]) => {
    initialData?.forEach(async (data) => {
      const position = await addressToPositions(data.address as string);
      const tDataWithPosition = initialData.map((data) => {
        return {
          trainingData: data,
          position,
        };
      });
      setOriginalData(tDataWithPosition);
      setMapTrainingData(tDataWithPosition);
    });
  };

  const updateCurrentCenter = async () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      setCurrentCenter({
        lat: center.getLat(),
        lng: center.getLng(),
      });
    }
  };
  useEffect(() => {
    if (initialData && initialData.length > 1) {
      dataWithPositionHandler(initialData);
    }
    const lat = Number(localStorage.getItem('lat') as string);
    const lng = Number(localStorage.getItem('lng') as string);
    setCurrentCenter({ lat, lng });
  }, [initialData]);

  const handleBtnClick = (name: string) => {
    setSelectBtn(name);
    setMapTrainingData((prev) =>
      prev.filter((tData) => tData.trainingData.trainerInfoDto?.name === name),
    );
  };

  const initializeHandler = () => {
    setSelectBtn(null);
    setMapTrainingData(originalData);
  };
  return (
    <div className="flex gap-x-4">
      <div className="w-[400px] shrink-0 space-y-4">
        <div className="">
          <Form method="GET">
            <div className="flex h-14 bg-white px-2 shadow-sm drop-shadow-md">
              <div className=" flex shrink-0 items-center">
                <select name="scope">
                  <option value="location" selected>
                    위치
                  </option>
                  <option value="name">트레이너</option>
                </select>
              </div>
              <SearchInput
                placeholder="위치나 트레이너를 입력하세요"
                iconClassName=" text-white rounded-full p-2 bg-accent"
                moduleOnclick={() => null}
              />
            </div>
          </Form>
        </div>
        {mapTrainingData.length < 1 && (
          <div className="relative h-[300px] bg-gray-100">
            <UndefinedCover>
              해당 지역에는 검색된 트레이닝이 없습니다!
            </UndefinedCover>
          </div>
        )}
        <div className="h-[630px] overflow-auto">
          <ul className="space-y-4">
            {selectBtn && (
              <div className="flex items-center gap-x-2">
                <button
                  type="button"
                  onClick={() => initializeHandler()}
                  className="flex"
                >
                  <span className="material-symbols-rounded">
                    arrow_back_ios
                  </span>
                </button>
                <h2 className="text-xl font-bold">
                  {mapTrainingData[0].trainingData.trainerInfoDto?.name}{' '}
                  트레이너
                </h2>
              </div>
            )}
            {mapTrainingData &&
              mapTrainingData.map((value) => {
                return (
                  <UserTrainingItem
                    key={value.trainingData.id}
                    trainerInfoDto={value.trainingData}
                  />
                );
              })}
          </ul>
        </div>
      </div>
      <div className="relative grow">
        <Map // 지도를 표시할 Container
          center={currentCenter}
          isPanto
          style={{
            // 지도의 크기
            width: '100%',
            height: '100%',
          }}
          level={5} // 지도의 확대 레벨
          onCreate={(map) => {
            mapRef.current = map;
          }}
        >
          {mapTrainingData.map((data) => {
            const isSelected =
              selectBtn === data.trainingData.trainerInfoDto?.name;
            const trainerName = data.trainingData.trainerInfoDto?.name;
            return (
              <EventMarkerContainer
                position={data.position}
                onClick={() => handleBtnClick(trainerName as string)}
                isVisible={isSelected}
                imageSrc={data.trainingData.trainerInfoDto?.trainerProfileImg}
              />
            );
          })}
        </Map>
        <button
          onClick={updateCurrentCenter}
          type="button"
          className="absolute left-1/2 top-10 z-30
            flex w-[200px] -translate-x-1/2 justify-between  rounded-full bg-white px-4 py-3 shadow-md drop-shadow-md"
        >
          <span className="material-symbols-rounded">restart_alt</span>이 지역
          다시 검색하기
        </button>
      </div>
    </div>
  );
};

export default UserMap;
