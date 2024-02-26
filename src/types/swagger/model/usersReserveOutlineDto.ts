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

/**
 * 회원의 트레이닝 예약, 진행,종료 정보 확인
 */
export interface UsersReserveOutlineDto { 
    /**
     * 트레이닝 예약 id
     */
    reservationId?: number;
    /**
     * 트레이닝 id
     */
    trainingId?: number;
    /**
     * 트레이닝 제목
     */
    title?: string;
    /**
     * 예약한 트레이닝 날짜, 시간
     */
    reserveDateTime?: Date;
    location?: string;
    /**
     * 트레이닝 진행 상황(진행 전, 진행중, 진행완료)
     */
    status?: UsersReserveOutlineDto.StatusEnum;
    /**
     * 트레이닝 결제(예약)한 날짜, 시간
     */
    paymentDateTime?: Date;
    /**
     * 트레이닝 결제 변경 날짜, 시간 (취소, 노쇼 처리 시 이걸 참고)
     */
    modifiedDateTime?: Date;
}
export namespace UsersReserveOutlineDto {
    export type StatusEnum = 'BEFORE' | 'START' | 'COMPLETE' | 'CANCEL' | 'NOSHOW';
    export const StatusEnum = {
        BEFORE: 'BEFORE' as StatusEnum,
        START: 'START' as StatusEnum,
        COMPLETE: 'COMPLETE' as StatusEnum,
        CANCEL: 'CANCEL' as StatusEnum,
        NOSHOW: 'NOSHOW' as StatusEnum
    };
}