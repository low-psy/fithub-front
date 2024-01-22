import { TrainerData, TrainingDto } from './training';

export default class Training implements TrainingDto {
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

  constructor(dto: TrainingDto) {
    this.totalPages = dto.totalPages;
    this.totalElements = dto.totalElements;
    this.size = dto.size;
    this.content = dto.content;
    this.number = dto.number;
    this.sort = dto.sort;
    this.numberOfElements = dto.numberOfElements;
    this.pageable = dto.pageable;
    this.first = dto.first;
    this.last = dto.last;
    this.empty = dto.empty;
  }
}

export function createFakeData(): Training {
  console.log('execute');
  const trainers: TrainerData[] = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    trainerInfoDto: {
      trainerId: index,
      name: `Trainer ${index}`,
      trainerProfileImg: `http://hitgym.tcubemnet.com/static/datas/board/attach/images/2019/05/20/722eae27d1c80499d453e72c68f052a1.jpg`,
      location: `Location ${index}`,
    },
    title: `Title ${index}`,
    price: 100 * index,
    location: `Location ${index}`,
    startDate: '2022-01-01',
    endDate: '2022-12-31',
    closed: false,
  }));

  console.log(trainers);

  return new Training({
    totalPages: 10,
    totalElements: 100,
    size: 10,
    content: trainers,
    number: 1,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    numberOfElements: 10,
    pageable: {
      offset: 0,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      pageNumber: 1,
      pageSize: 10,
      paged: true,
      unpaged: false,
    },
    first: true,
    last: false,
    empty: false,
  });
}
