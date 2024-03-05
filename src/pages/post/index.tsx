import React, { useCallback, useEffect, useState } from 'react';
import {
  Link,
  LoaderFunction,
  useLoaderData,
  Outlet,
  useLocation,
  useParams,
  redirect,
  Form,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import PostItem from './PostItem';
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
import UndefinedCover from '../../components/common/UndefinedCover';
import FilterLayout from '../../components/filter/FilterLayout';
import { errorFunc, setRefreshToken } from '../../utils/util';
import useSearchModal from '../../hooks/useSearchModal';
import SearchInput from '../../components/form/SearchInput';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import { PostInfoDto } from '../../types/swagger/model/postInfoDto';

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

  const { postId } = useParams<{ postId?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const isModal = location.state?.isModal;
  const [searchParams, setSearchParams] = useSearchParams();
  const booked = searchParams.get('booked');
  const liked = searchParams.get('liked');

  const { enteredText, clickHandler, inputChangeHandler } = useSearchModal();
  const [last, setLast] = useState<boolean>(postPage.last as boolean);
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

  const { data, loaderIndicator } = useInfiniteScroll<PostInfoDto>({
    initialData: postInfo || [],
    fetchData,
    last,
  });

  const getLikeAndBookInfo = useCallback(() => {
    const PostRequestDtos = data?.map((post) => {
      return { postId: post.postId as number };
    });
    console.log('getLikeAndBook');
    if (isLogin && PostRequestDtos) {
      getLikeBook(PostRequestDtos).then((res) => {
        setBookAndLikes(res.data);
      });
    }
    getLikes(PostRequestDtos).then((res) => {
      setLikedInfos(res.data);
    });
  }, [data, isLogin]);

  useEffect(() => {
    // const PostRequestDtos = data?.map((post) => {
    //   return { postId: post.postId as number };
    // });
    // if (isLogin && PostRequestDtos) {
    //   getLikeBook(PostRequestDtos).then((res) => {
    //     setBookAndLikes(res.data);
    //   });
    // }
    // getLikes(PostRequestDtos).then((res) => {
    //   setLikedInfos(res.data);
    // });
    getLikeAndBookInfo();
  }, [getLikeAndBookInfo]);

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
        {!data?.[0] && (
          <div className="relative h-[400px] bg-gray-100">
            <UndefinedCover>{text}이 없습니다</UndefinedCover>
          </div>
        )}
        <ul className="flex gap-x-4">
          {alignBtnArray.map((v, i) => {
            return (
              <li className="shrink-0 rounded-full bg-white px-4 py-2">
                <button
                  type="button"
                  className="flex items-center gap-x-2"
                  onClick={() => alignBtnHandler(i)}
                >
                  <div className={`aspect-square w-3 rounded-full ${v.bg}`} />
                  {v.value}
                </button>
              </li>
            );
          })}
        </ul>
        {data.map((post, index) => {
          const likeAndBook = bookAndLikes[index];
          const likedInfo = likedInfos[index];
          return (
            <PostItem
              key={post.postId}
              {...post}
              bookAndLikes={likeAndBook}
              likedUsers={likedInfo?.likedUsers}
              onClick={getLikeAndBookInfo}
            />
          );
        })}
        <div ref={loaderIndicator} />
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
      <section className="relative mx-auto w-[728px] space-y-4">
        <Form method="GET">
          <div className="flex h-14 bg-white px-2 shadow-sm drop-shadow-sm">
            <div className=" flex shrink-0 items-center">
              <select name="scope">
                <option value="content" selected>
                  내용
                </option>
                <option value="writer">작성자</option>
                <option value="hashTags">해시태그</option>
              </select>
            </div>
            <SearchInput
              onChange={(e) => inputChangeHandler(e.target.value)}
              value={enteredText}
              moduleOnclick={clickHandler}
              placeholder="게시물의 내용, 작성자, 해시태그를 기준으로 검색해 보세요!"
              iconClassName=" text-white rounded-full p-2 bg-accent"
            />
          </div>
        </Form>
        <ul className="flex">
          {alignBtnArray.map((v, i) => {
            return (
              <li className="shrink-0 rounded-full bg-white px-4 py-2">
                <button
                  type="button"
                  className="flex items-center gap-x-2"
                  onClick={() => alignBtnHandler(i)}
                >
                  <div className={`aspect-square w-3 rounded-full ${v.bg}`} />
                  {v.value}
                </button>
              </li>
            );
          })}
        </ul>
        {!data[0] && (
          <div className="relative h-[400px] bg-gray-100">
            <UndefinedCover>생성한 게시물이 없습니다</UndefinedCover>
          </div>
        )}
        {data?.map((post, index) => {
          const likeAndBook = bookAndLikes[index];
          const likedInfo = likedInfos[index];
          return (
            <PostItem
              key={post.postId}
              {...post}
              bookAndLikes={likeAndBook}
              likedUsers={likedInfo?.likedUsers}
              onClick={getLikeAndBookInfo}
            />
          );
        })}
        <div ref={loaderIndicator} />
      </section>
    </div>
  );
};

export default Post;
