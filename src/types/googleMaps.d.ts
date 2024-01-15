const { google } = window;
// 예: types.d.ts
declare global {
  interface Window {
    google: typeof google;
  }
}
