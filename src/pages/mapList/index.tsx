import { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { MapDto } from 'types/swagger/model/mapDto';
import { getMapList } from '../../apis/trainer';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import { MapDocumentDto } from '../../types/swagger/model/mapDocumentDto';
import { errorFunc } from '../../utils/util';

const MapList = () => {
  const req = useAsyncValue() as AxiosResponse<MapDto>;
  const [last, setLast] = useState<boolean>(req.data.end as boolean);
  const [page, setPage] = useState<number>(1);
  const fetchData = useCallback(
    async (page: number): Promise<MapDocumentDto[] | []> => {
      if (last) {
        return [];
      }
      try {
        const x = Number(localStorage.getItem('lat'));
        const y = Number(localStorage.getItem('lng'));
        const nextPageData = await getMapList({ page, x, y });
        if (nextPageData.status === 200) {
          setLast(nextPageData.data.end as boolean);
          setPage(page);
          return nextPageData.data.mapDocumentDto || [];
        }
        return [];
      } catch (err) {
        errorFunc(err);
        return [];
      }
    },
    [last],
  );
  const { data, loaderIndicator } = useInfiniteScroll<MapDocumentDto>({
    initialData: req.data.mapDocumentDto || [],
    fetchData,
    last,
    page,
  });
  return (
    <div className="mx-auto max-w-[1000px]">
      <h2 className="mb-4 text-2xl font-extrabold">주변 헬스장 조회</h2>
      <div className="">
        <ul className="lg: grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {data.map(({ addressName, phone, placeName, placeUrl }) => {
            return (
              <li
                key={addressName}
                className="rounded-lg p-4  text-sm text-gray-700 shadow-md drop-shadow-md"
              >
                <a href={placeUrl} target="_blank" rel="noreferrer">
                  <div className="mb-4 truncate text-lg font-bold text-black">
                    {placeName}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-rounded">home</span>
                      <p>{addressName}</p>
                    </div>
                    <div className="flex items-center  justify-between">
                      <span className="material-symbols-rounded ">call</span>
                      <p>{phone}</p>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
          <div ref={loaderIndicator} />
        </ul>
      </div>
    </div>
  );
};

export default MapList;
