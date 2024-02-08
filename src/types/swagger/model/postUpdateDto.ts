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
import { PostDocumentUpdateDto } from './postDocumentUpdateDto';

/**
 * 게시글 수정 dto
 */
export interface PostUpdateDto { 
    /**
     * 게시글 id
     */
    id: number;
    /**
     * 게시글 내용
     */
    content?: string;
    /**
     * 게시글 해시태그
     */
    hashTags?: string;
    /**
     * 수정된 게시글 이미지
     */
    editedImages: Array<PostDocumentUpdateDto>;
    imageChanged?: boolean;
}