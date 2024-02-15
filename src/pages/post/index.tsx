import React, { useEffect, useMemo, useState } from 'react';
import {
  Link,
  LoaderFunction,
  useLoaderData,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { AxiosError } from 'axios';
import FilterLayout from '../../components/filter/FilterLayout';
import PostItem from '../../components/post/PostItem';
import { LoaderData } from '../../types/training';
import { getLikeBook, getLikes, getPost, postComment } from '../../apis/post';
import { LikesBookmarkStatusDto } from '../../types/swagger/model/likesBookmarkStatusDto';
import { initialTokenState } from '../../redux/initialStates/initialStates';
import RedirectModal from '../../components/common/module/RedirectModal';
import { LikedUsersInfoDto } from '../../types/swagger/model/likedUsersInfoDto';
import { useAppSelector } from '../../hooks/reduxHooks';

export const loader = (async () => {
  try {
    const response = await getPost();
    if (response && response.status === 200) {
      return response;
    }
    return response;
  } catch (err) {
    const error = err as unknown as AxiosError;
    throw error;
  }
}) satisfies LoaderFunction;

const Post = () => {
  const { postId } = useParams<{ postId?: string }>();
  const location = useLocation();
  const isModal = location.state?.isModal;

  const PostDto = useLoaderData() as LoaderData<typeof loader>;
  const PostRequestDtos = useMemo(() => {
    return PostDto.data.content?.map((post) => {
      return { postId: post.postId as number };
    });
  }, [PostDto.data.content]);
  const [bookAndLikes, setBookAndLikes] = useState<LikesBookmarkStatusDto[]>([
    { bookmarkStatus: false, likesStatus: false, postId: undefined },
  ]);
  const [likedInfos, setLikedInfos] = useState<LikedUsersInfoDto[]>([
    { likedCount: 0, likedUsers: [{ nickname: '', profileUrl: '' }] },
  ]);

  const { isLogin } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isLogin) {
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
      <main className="mx-auto w-full border-[1px] border-zinc-300 lg:w-2/3 ">
        <Outlet />
      </main>
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
      <section className="mx-auto w-[728px] space-y-12">
        {PostDto.data.content?.[0] ? (
          PostDto.data.content.map((post) =>
            bookAndLikes.map((likeAndBook) => {
              return likedInfos.map((likedInfo) => {
                return (
                  <PostItem
                    {...post}
                    bookAndLikes={likeAndBook}
                    likedUsers={likedInfo.likedUsers}
                    likedCount={likedInfo.likedCount}
                  />
                );
              });
            }),
          )
        ) : (
          <div className="text-center text-2xl font-extrabold">
            작성한 게시물이 없습니다
          </div>
        )}
      </section>
      {isModal && (
        <RedirectModal>
          <Outlet />
        </RedirectModal>
      )}
    </div>
  );
};

export default Post;
