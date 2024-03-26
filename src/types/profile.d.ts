import { Gender } from './user';

export interface IProfile {
  [key: string]: string | any;
  bio: string;
  email: string;
  gender: Gender;
  nickname: string;
  phone: string;
  profileImg: string;
  grade: string;
  interests: string[];
}
