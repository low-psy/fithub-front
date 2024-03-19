import React from 'react';
import { useMap, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { kakaoLocation } from '../../types/map';

interface EventMarkerContainerProps {
  position: kakaoLocation;
  isVisible?: boolean;
  onClick: () => void;
  imageSrc?: string;
}
const { kakao } = window;
const EventMarkerContainer: React.FC<EventMarkerContainerProps> = ({
  position,
  isVisible,
  onClick,
  imageSrc,
}) => {
  const map = useMap();
  return (
    <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
      // 커스텀 오버레이가 표시될 위치입니다
      position={position}
      clickable
    >
      {/* 커스텀 오버레이에 표시할 내용입니다 */}
      <button
        className={`aspect-square w-14 overflow-hidden rounded-full shadow-md drop-shadow-md transition-transform duration-150 ${isVisible ? 'scale-125' : ''}`}
        type="button"
        onClick={() => {
          const coords = new kakao.maps.LatLng(position.lat, position.lng);
          onClick();
          map.panTo(coords);
        }}
      >
        <img
          src={imageSrc}
          alt="프로필 이미지"
          className="h-full w-full object-cover"
        />
      </button>
    </CustomOverlayMap>
  );
};
export default EventMarkerContainer;
