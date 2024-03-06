import React, { useCallback, useEffect, useState } from 'react';
import {
  Link,
  LoaderFunction,
  useLoaderData,
  Outlet,
  useLocation,
  redirect,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { LoaderData, refreshResData } from '../../types/common';
import {
  getBookedPost,
  getLikeBook,
  getLikedPost,
  getLikes,
  getPost,
  getPostSearch,
} from '../../apis/post';
import { LikesBookmarkStatusDto } from '../../types/swagger/model/likesBookmarkStatusDto';
import { LikedUsersInfoDto } from '../../types/swagger/model/likedUsersInfoDto';
import { useAppSelector } from '../../hooks/reduxHooks';
import FilterLayout from '../../components/filter/FilterLayout';
import { errorFunc, setRefreshToken } from '../../utils/util';
import useSearchModal from '../../hooks/useSearchModal';
import { PostInfoDto } from '../../types/swagger/model/postInfoDto';
import PostSearch from './PostSearch';
import PostAlign from './PostAlign';

export const loader = (async ({ request }) => {
  const url = new URL(request.url);
  const booked = url.searchParams.get('booked');
  const liked = url.searchParams.get('liked');
  const scope = url.searchParams.get('scope');
  const searchInput = url.searchParams.get('searchInput');
  const alignString = url.searchParams.get('align');
  try {
    let res;
    if (scope && searchInput) {
      res = await getPostSearch(
        { keyword: searchInput, scope },
        alignString,
        0,
      );
    } else if (booked) {
      res = await getBookedPost(0);
    } else if (liked) {
      res = await getLikedPost(0);
    } else {
      res = await getPost(0);
    }
    if (res && res.status === 200) {
      return res;
    }
    if (res.status === 201) {
      const { accessToken } = res.data as refreshResData;
      setRefreshToken(accessToken);
      return redirect('/post');
    }
    return res;
  } catch (err) {
    const status = errorFunc(err);
    return redirect('');
  }
}) satisfies LoaderFunction;

const alignBtnArray = [
  { value: '전체', bg: 'bg-main' },
  { value: '최신순', bg: 'bg-cyan-400' },
  { value: '좋아요순', bg: 'bg-accent' },
  { value: '댓글순', bg: 'bg-green-400' },
];

const Post = () => {
  const defaultRes = useLoaderData() as LoaderData<typeof loader>;
  const postPage = defaultRes.data;
  const postInfo = postPage.content;

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const booked = searchParams.get('booked');
  const liked = searchParams.get('liked');

  const { enteredText, clickHandler, inputChangeHandler } = useSearchModal();
  const [last, setLast] = useState<boolean>(postPage.last as boolean);
  useEffect(() => {
    setLast(postPage.last as boolean);
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
        return navigate('/post/home');
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
      const booked = searchParams.get('booked');
      const liked = searchParams.get('liked');
      const scope = searchParams.get('scope');
      const searchInput = searchParams.get('searchInput');
      const alignString = searchParams.get('align');
      try {
        let res;
        if (scope && searchInput) {
          res = await getPostSearch(
            { keyword: searchInput, scope },
            alignString,
            page,
          );
        } else if (booked) {
          res = await getBookedPost(page);
        } else if (liked) {
          res = await getLikedPost(page);
        } else {
          res = await getPost(page);
        }
        if (res && res.status === 200) {
          setLast(res.data.last as boolean);
          return res.data.content || [];
        }
        if (res.status === 201) {
          const { accessToken } = res.data as refreshResData;
          setRefreshToken(accessToken);
          navigate('/post');
          return [];
        }
        return [];
      } catch (err) {
        errorFunc(err);
        return [];
      }
    },
    [navigate, searchParams],
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
  };
  const isNotSearch =
    location.pathname.includes('favorite') ||
    location.pathname.includes('book');
  const isNotFilterLayout = !location.pathname.includes('home');
  let title;
  if (liked) {
    title = '좋아요한 게시물';
  } else if (booked) {
    title = '북마크한 게시글';
  } else if (location.pathname.includes('explore')) {
    const scope = searchParams.get('scope');
    const keyword = searchParams.get('searchInput');
    if (scope === 'content') {
      title = `내용:${keyword} 검색결과`;
    } else if (scope === 'writer') {
      title = `작성자:${keyword} 검색결과`;
    } else if (scope === 'hashTags') {
      title = `해시태그:${keyword} 검색결과`;
    }
  }
  return (
    <div className="flex gap-8 space-y-4 md:space-y-0">
      {!isNotFilterLayout && (
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
      )}
      <section className="relative mx-auto w-[728px] space-y-4">
        {isNotFilterLayout && (
          <h1 className="text-3xl font-extrabold">{title}</h1>
        )}
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
