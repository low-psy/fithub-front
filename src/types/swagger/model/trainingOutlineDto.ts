/**
 * Fithub API Document
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { TrainerInfoDto } from './trainerInfoDto';

export interface TrainingOutlineDto { 
    id?: number;
    trainerInfoDto?: TrainerInfoDto;
    title?: string;
    price?: number;
    address?: string;
    /**
     * 보내준 위치와의 거리. 위치로 트레이닝 검색할 때만 값이 들어가있음
     */
    dist?: number;
    startDate?: string;
    endDate?: string;
    closed?: boolean;
}