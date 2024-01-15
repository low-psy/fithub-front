import { LoaderFunction } from 'react-router-dom';

export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<
  ReturnType<TLoaderFn>
> extends Response | infer D
  ? D
  : never;

export interface TrainerData {
  id: number;
  trainerInfoDto: {
    trainerId: number;
    name: string;
    trainerProfileImg: string;
    location: string;
  };
  title: string;
  price: number;
  location: string;
  startDate: string;
  endDate: string;
  closed: boolean;
}

export interface TrainingDto {
  totalPages: number;
  totalElements: number;
  size: number;
  content: TrainerData[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface TrainingSectionProps {
  trainerInfoDto: TrainerData;
}
