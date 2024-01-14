import { Gender } from './user';

export interface IProfile {
  bio: string;
  email: string;
  gender: Gender;
  nickname: string;
  phone: string;
  profileImg: string;
  grade: string;
}
