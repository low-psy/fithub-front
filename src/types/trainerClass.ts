import { TrainerData } from './training';

export default class Trainer implements TrainerData {
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

  constructor(data: TrainerData) {
    this.id = data.id;
    this.trainerInfoDto = data.trainerInfoDto;
    this.title = data.title;
    this.price = data.price;
    this.location = data.location;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.closed = data.closed;
  }
}
