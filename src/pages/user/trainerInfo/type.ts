export enum TrainerInfoType {
  License = 'License',
  Career = 'Career',
  Location = 'Location',
}

export type TrainerInfoObjType = {
  [key in TrainerInfoType]: string;
};

export const TrainerInfoObj: TrainerInfoObjType = {
  [TrainerInfoType.License]: '자격증',
  [TrainerInfoType.Career]: '경력',
  [TrainerInfoType.Location]: '위치',
};

export interface LicenceType {
  inputName: string;
  licenseId: number;
  url: string;
}

export interface CareerType {
  address: string;
  careerId: number;
  company: string;
  startDate: string;
  endDate: string | null;
  work: string;
  working: boolean;
  latitude: number;
  logitude: number;
}

export interface NewCareerType {
  careerId: null;
  company: string;
  work: string;
  startDate: string;
  endDate: string;
}

export interface TrainerInfoRes {
  trainerLicenseList: LicenceType[];
  trainerCareerList: CareerType[];
  address: string;
}
