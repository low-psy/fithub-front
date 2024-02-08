import React, { useEffect, useState } from 'react';
import {
  redirect,
  Link,
  LoaderFunction,
  useLoaderData,
  Outlet,
  useLocation,
  useParams,
  ActionFunctionArgs,
  json,
} from 'react-router-dom';
import { AxiosError } from 'axios';
import store from '../../redux/store';
import FilterLayout from '../../components/filter/FilterLayout';
import PostItem from '../../components/post/PostItem';
import { LoaderData } from '../../types/training';
import { getLikeBook, getPost, postComment } from '../../apis/post';
import { LikesBookmarkStatusDto } from '../../types/swagger/model/likesBookmarkStatusDto';
import { initialTokenState } from '../../redux/initialStates/initialStates';
import RedirectModal from '../../components/common/module/RedirectModal';

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
  const [bookAndLikes, setBookAndLikes] = useState<LikesBookmarkStatusDto[]>([
    { bookmarkStatus: false, likesStatus: false, postId: undefined },
  ]);
  useEffect(() => {
    const { accessToken } = store.getState().token;
    if (accessToken !== initialTokenState.accessToken) {
      getLikeBook(PostDto.data.content).then((res) => {
        setBookAndLikes(res.data);
      });
    }
  }, [PostDto.data.content]);
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
        {PostDto.data.content[0] ? (
          PostDto.data.content.map((post) =>
            bookAndLikes.map((likeAndBook) => {
              return <PostItem {...post} bookAndLikes={likeAndBook} />;
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

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const content = formData.get('content')?.toString();
  const postId = Number(formData.get('postId'));
  const parentCommentId = Number(formData.get('parentCommentId'))
    ? Number(formData.get('parentCommentId'))
    : null;
  console.log(content, typeof postId, parentCommentId);
  if (!content && !content?.trim()) {
    return redirect('/post'); // 빈 입력은 무시
  }
  try {
    const response = await postComment(content, postId, parentCommentId); // postComment API 호출
    if (response.status === 200) {
      return json({ comment: true });
    }
    return redirect('/');
  } catch (err) {
    const error = err as unknown as AxiosError;
    alert(error.message);
    return redirect('/post');
  }
};

export default Post;
