const { kakao } = window;
// 예: types.d.ts
declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

export interface kakaoLocation {
  lat: number;
  lng: number;
}
