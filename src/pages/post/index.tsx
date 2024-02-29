import React, { useEffect, useState } from 'react';
import {
  Link,
  LoaderFunction,
  useLoaderData,
  Outlet,
  useLocation,
  useParams,
  redirect,
} from 'react-router-dom';
import PostItem from './PostItem';
import { LoaderData, refreshResData } from '../../types/common';
import {
  getBookedPost,
  getLikeBook,
  getLikedPost,
  getLikes,
  getPost,
} from '../../apis/post';
import { LikesBookmarkStatusDto } from '../../types/swagger/model/likesBookmarkStatusDto';
import { LikedUsersInfoDto } from '../../types/swagger/model/likedUsersInfoDto';
import { useAppSelector } from '../../hooks/reduxHooks';
import UndefinedCover from '../../components/common/UndefinedCover';
import FilterLayout from '../../components/filter/FilterLayout';
import { errorFunc, setRefreshToken } from '../../utils/util';

export const loader = (async ({ request }) => {
  const url = new URL(request.url);
  const booked = url.searchParams.get('booked');
  console.log(booked);
  const liked = url.searchParams.get('liked');
  try {
    let res;
    if (booked) {
      res = await getBookedPost();
    } else if (liked) {
      res = await getLikedPost();
    } else {
      res = await getPost();
    }
    if (res && res.status === 200) {
      return res;
    }
    if (res.status === 201) {
      console.log(res.data);
      const { accessToken } = res.data as refreshResData;
      setRefreshToken(accessToken);
      return redirect('/post');
    }
    return res;
  } catch (err) {
    const status = errorFunc(err);
    if (status === 401) {
      redirect('/login');
    }
    return redirect('/');
  }
}) satisfies LoaderFunction;

const Post = () => {
  const { postId } = useParams<{ postId?: string }>();
  const location = useLocation();
  const isModal = location.state?.isModal;
  const searchParams = new URLSearchParams(location.search);
  const booked = searchParams.get('booked');
  const liked = searchParams.get('liked');

  const PostDto = useLoaderData() as LoaderData<typeof loader>;
  const [bookAndLikes, setBookAndLikes] = useState<LikesBookmarkStatusDto[]>([
    { bookmarkStatus: false, likesStatus: false, postId: undefined },
  ]);
  const [likedInfos, setLikedInfos] = useState<LikedUsersInfoDto[]>([
    { likedCount: 0, likedUsers: [{ nickname: '', profileUrl: '' }] },
  ]);

  const { isLogin } = useAppSelector((state) => state.user);

  useEffect(() => {
    const PostRequestDtos = PostDto.data.content?.map((post) => {
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
  }, [PostDto.data.content, isLogin]);

  if (!isModal && postId) {
    return (
      <main className="mx-auto w-full border-[1px] border-zinc-300 lg:w-2/3">
        <Outlet />
      </main>
    );
  }
  if (booked || liked) {
    const text = booked ? '북마크한 게시물' : '좋아요 누른 게시글';
    return (
      <section className="relative mx-auto w-[728px] space-y-4 ">
        <h2 className="text-4xl font-extrabold ">{text}</h2>
        {!PostDto.data.content?.[0] && (
          <div className="relative h-[400px] bg-gray-100">
            <UndefinedCover>{text}이 없습니다</UndefinedCover>
          </div>
        )}
        {PostDto.data.content?.map((post, index) => {
          const likeAndBook = bookAndLikes[index];
          const likedInfo = likedInfos[index];
          return (
            <PostItem
              key={post.postId}
              {...post}
              bookAndLikes={likeAndBook}
              likedUsers={likedInfo?.likedUsers}
            />
          );
        })}
      </section>
    );
  }

  return (
    <div className="flex gap-8 space-y-4 md:space-y-0">
      <FilterLayout>
        <div className="space-y-12">
          <div>
            <Link
              to="/newpost"
              className=" block break-keep bg-accent_sub p-4 text-center text-3xl font-extrabold text-accent"
            >
              게시물 작성하기
            </Link>
          </div>
          <div>chat</div>
        </div>
      </FilterLayout>
      <section className="relative mx-auto w-[728px] ">
        {!PostDto.data.content?.[0] && (
          <div className="relative h-[400px] bg-gray-100">
            <UndefinedCover>생성한 게시물이 없습니다</UndefinedCover>
          </div>
        )}
        {PostDto.data.content?.map((post, index) => {
          const likeAndBook = bookAndLikes[index];
          const likedInfo = likedInfos[index];
          return (
            <PostItem
              key={post.postId}
              {...post}
              bookAndLikes={likeAndBook}
              likedUsers={likedInfo?.likedUsers}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Post;
