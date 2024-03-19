import React, { useState } from 'react';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';

interface SignleMap {
  location: { lat: number; lng: number } | undefined;
  isMarker: boolean;
  level: number;
  children?: any;
}

const SingleMap: React.FC<SignleMap> = ({
  isMarker,
  location,
  level,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(location);
  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: location?.lat || 33.450701,
        lng: location?.lng || 126.570667,
      }}
      style={{
        // 지도의 크기
        width: '100%',
        height: '100%',
      }}
      level={level} // 지도의 확대 레벨
    >
      {isMarker && (
        <MapMarker // 인포윈도우를 생성하고 지도에 표시합니다
          position={{
            // 인포윈도우가 표시될 위치입니다
            lat: location?.lat || 33.450701,
            lng: location?.lng || 126.570667,
          }}
          clickable // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          onClick={() => setIsOpen(true)}
        >
          {isOpen && children}
        </MapMarker>
      )}
    </Map>
  );
};

export default SingleMap;
