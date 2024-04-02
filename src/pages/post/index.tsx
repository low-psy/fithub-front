import React, { useCallback, useEffect, useState } from 'react';
import {
  Link,
  LoaderFunction,
  useLoaderData,
  Outlet,
  useLocation,
  useSearchParams,
  useNavigate,
  redirect,
} from 'react-router-dom';
import { LoaderData, refreshResData } from '../../types/common';
import { getLikeBook, getLikes } from '../../apis/post';
import { LikesBookmarkStatusDto } from '../../types/swagger/model/likesBookmarkStatusDto';
import { LikedUsersInfoDto } from '../../types/swagger/model/likedUsersInfoDto';
import { useAppSelector } from '../../hooks/reduxHooks';
import FilterLayout from '../../components/filter/FilterLayout';
import {
  errorFunc,
  isRefreshResData,
  postFetchFunc,
  setRefreshToken,
} from '../../utils/util';
import useSearchModal from '../../hooks/useSearchModal';
import { PostInfoDto } from '../../types/swagger/model/postInfoDto';
import PostSearch from './PostSearch';
import PostAlign from './PostAlign';
import Chat from '../Chat';

export const loader = (async ({ request }) => {
  const url = new URL(request.url);
  const { searchParams } = url;
  try {
    const res = await postFetchFunc(searchParams, 0);
    if (res.status === 200) {
      return res;
    }
    if (res.status === 201) {
      if (isRefreshResData(res.data)) {
        const { accessToken } = res.data as refreshResData;
        setRefreshToken(accessToken);
      }
    }
    throw new Error('server is trouble');
  } catch (err) {
    errorFunc(err);
    return redirect('/');
  }
}) satisfies LoaderFunction;

const alignBtnArray = [
  { value: '전체', bg: 'bg-main' },
  { value: '최신순', bg: 'bg-cyan-400' },
  { value: '좋아요순', bg: 'bg-accent' },
  { value: '댓글순', bg: 'bg-green-400' },
];

const Post = () => {
  const res = useLoaderData() as LoaderData<typeof loader>;
  const postPage = res.data;
  const postInfo = postPage.content;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const booked = searchParams.get('booked');
  const liked = searchParams.get('liked');

  const { enteredText, clickHandler, inputChangeHandler } = useSearchModal();
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

  const alignBtnHandler = (i: number) => {
    switch (i) {
      case 0:
        return navigate('/post');
      case 1:
        searchParams.set('align', 'id');
        break;
      case 2:
        searchParams.set('align', 'likes');
        break;
      case 3:
        searchParams.set('align', 'comments');
        break;
      default:
        searchParams.set('align', 'id');
    }
    setSearchParams(searchParams);
  };
  const fetchData = useCallback(
    async (page: number): Promise<PostInfoDto[] | []> => {
      const res = await postFetchFunc(searchParams, page);
      if (res.data.content && res.data.content.length > 1) {
        setPage((prev) => prev + 1);
      } else {
        setLast(true);
      }
      return res.data.content || [];
    },
    [searchParams],
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
    inputChangeHandler,
    alignBtnArray,
    alignBtnHandler,
    bookAndLikes,
    clickHandler,
    enteredText,
    getLikeAndBookInfo,
    likedInfos,
    postInfo,
    fetchData,
    last,
    page,
  };
  const isNotSearch =
    location.pathname.includes('favorite') ||
    location.pathname.includes('book');
  let title;
  if (liked) {
    title = '좋아요한 게시물';
  } else if (booked) {
    title = '북마크한 게시글';
  } else if (location.pathname.includes('explore')) {
    const scope = searchParams.get('scope');
    const keyword = searchParams.get('searchInput');
    if (scope === 'content') {
      title = `내용: ${keyword} 검색결과`;
    } else if (scope === 'writer') {
      title = `작성자: ${keyword} 검색결과`;
    } else if (scope === 'hashTags') {
      title = `해시태그: ${keyword} 검색결과`;
    }
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
          <Chat />
        </div>
      </FilterLayout>
      <section className="relative mx-auto w-[728px] space-y-4">
        <h1 className="text-3xl font-extrabold">{title}</h1>
        {!isNotSearch && (
          <PostSearch
            clickHandler={clickHandler}
            enteredText={enteredText}
            inputChangeHandler={inputChangeHandler}
          />
        )}
        <PostAlign
          alignBtnArray={alignBtnArray}
          alignBtnHandler={alignBtnHandler}
        />
        <Outlet context={outletContext} />
      </section>
    </div>
  );
};

export default Post;
