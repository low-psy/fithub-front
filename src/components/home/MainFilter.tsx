import React from 'react';
import MainFilterItem from './MainFilterItem';
import lookupFilter from '../../assets/lookupFilter.png';
import mapFilter from '../../assets/mapFilter.png';
import newpostFilter from '../../assets/newpostFilter.png';

const MainFilter = () => {
  return (
    <div className="grid h-56 grid-cols-2  gap-3">
      <div className="row-span-2  flex ">
        <MainFilterItem bg={lookupFilter} to="/lookup">
          운동 게시글 조회하기
        </MainFilterItem>
      </div>
      <div className=" flex">
        <MainFilterItem bg={newpostFilter} to="newpost">
          게시글 작성하기
        </MainFilterItem>
      </div>
      <div className=" flex ">
        <MainFilterItem bg={mapFilter} to="map">
          지도에서 찾아보기
        </MainFilterItem>
      </div>
    </div>
  );
};
export default MainFilter;
