import React, { useCallback, useEffect, useState } from 'react';
import { getLikeBook, getLikes, getUsersPost } from 'apis/post';
import { LoaderFunction, Outlet, useLoaderData } from 'react-router-dom';
import { useAppSelector } from 'hooks/reduxHooks';

import { LikesBookmarkStatusDto } from 'types/swagger/model/likesBookmarkStatusDto';
import { LikedUsersInfoDto } from 'types/swagger/model/likedUsersInfoDto';
import { PostInfoDto } from 'types/swagger/model/postInfoDto';
import { LoaderData } from '../../../types/common';

export const loader = (async ({ request }) => {
  const res = await getUsersPost(0);
  if (res.status === 200) {
    return res;
  }
  return res;
}) satisfies LoaderFunction;

const Posts = () => {
  const res = useLoaderData() as LoaderData<typeof loader>;

  const postPage = res.data;
  const postInfo = postPage.content;

  const [last, setLast] = useState<boolean>(postPage.last as boolean);

  const [page, setPage] = useState<number>(postPage.number as number);

  useEffect(() => {
    setLast(postPage.last as boolean);
    setPage(postPage.number as number);
  }, [postPage]);

  const [bookAndLikes, setBookAndLikes] = useState<LikesBookmarkStatusDto[]>([
    { bookmarkStatus: false, likesStatus: false, postId: undefined },
  ]);
  const [likedInfos, setLikedInfos] = useState<LikedUsersInfoDto[]>([
    { likedCount: 0, likedUsers: [{ nickname: '', profileUrl: '' }] },
  ]);

  const { isLogin } = useAppSelector((state) => state.user);

  const fetchData = useCallback(
    async (page: number): Promise<PostInfoDto[] | []> => {
      const res = await getUsersPost(page);
      if (res.data.content && res.data.content.length > 1) {
        setPage((prev) => prev + 1);
      } else {
        setLast(true);
      }
      return res.data.content || [];
    },
    [],
  );

  const getLikeAndBookInfo = useCallback(
    (data: PostInfoDto[]) => {
      const PostRequestDtos = data?.map((post) => {
        return { postId: post.postId as number };
      });
      if (isLogin && PostRequestDtos) {
        getLikeBook(PostRequestDtos).then((res) => {
          setBookAndLikes(res.data);
        });
      }
      getLikes(PostRequestDtos).then((res) => {
        setLikedInfos(res.data);
      });
    },
    [isLogin],
  );

  const outletContext = {
    bookAndLikes,
    getLikeAndBookInfo,
    likedInfos,
    postInfo,
    fetchData,
    last,
    page,
  };

  return (
    <div className="flex flex-col">
      <p className="mb-4 text-lg font-semibold">내가 쓴 글</p>
      <div className="mb-4 w-full flex-row">
        <Outlet context={outletContext} />
      </div>
    </div>
  );
};

export default Posts;
