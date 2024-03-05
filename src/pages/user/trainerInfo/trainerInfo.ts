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

export interface License {
  inputName: string;
  licenseId: number;
  url: string;
}

export interface Career {
  address: string;
  careerId: number;
  company: string;
  startDate: string;
  endDate: string | null;
  work: string;
  working: boolean;
}

export interface Location {
  id: number;
  value: string;
}

export interface TrainerInfoRes {
  trainerLicenseList: License[];
  trainerCareerList: Career[];
  trainerAddress: Location[];
}
