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
 * 최상위 댓글의 답글 정보 dto
 */
export interface CommentInfoDto { 
    /**
     * 답글 id
     */
    commentId?: number;
    /**
     * 답글 작성자의 닉네임
     */
    writerNickName?: string;
    /**
     * 답글 작성자의 프로필 url
     */
    writerProfileUrl?: string;
    /**
     * 답글 내용
     */
    content?: string;
    /**
     * 부모 댓글 작성자의 닉네임 (멘션 언급 시 사용 ex @fithub )
     */
    mentionedUserNickname?: string;
    /**
     * 답글 삭제 여부
     */
    deleted?: boolean;
    /**
     * 답글 생성일
     */
    createdDate?: Date;
    /**
     * 답글 수정일
     */
    modifiedDate?: Date;
    /**
     * 자식 답글 리스트
     */
    childComments?: Array<CommentInfoDto>;
}