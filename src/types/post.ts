import React from 'react';
import { PostInfoDto } from './swagger/model/postInfoDto';
import { LikesBookmarkStatusDto } from './swagger/model/likesBookmarkStatusDto';
import { LikedUsersInfoDto } from './swagger/model/likedUsersInfoDto';

export interface PostOutletProps {
  bookAndLikes: LikesBookmarkStatusDto[];
  likedInfos: LikedUsersInfoDto[];
  getLikeAndBookInfo: (data: PostInfoDto[]) => void;
  postInfo: PostInfoDto[];
  fetchData: (page: number) => Promise<PostInfoDto[] | []>;
  last: boolean | undefined;
}
