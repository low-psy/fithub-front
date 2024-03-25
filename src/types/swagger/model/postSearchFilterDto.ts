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
 * 게시글 검색 필터 dto
 */
export interface PostSearchFilterDto { 
    /**
     * 검색 키워드
     */
    keyword?: string;
    /**
     * 검색 범위 (내용, 작성자, 해시태그)
     */
    scope?: string;
}