import React from 'react';
import {
  redirect,
  Link,
  LoaderFunction,
  useLoaderData,
} from 'react-router-dom';
import { AxiosError } from 'axios';
import store from '../../redux/store';
import FilterLayout from '../../components/filter/FilterLayout';
import PostItem from '../../components/post/PostItem';
import { LoaderData } from '../../types/training';
import { getPost } from '../../apis/post';

export const loader = (async () => {
  const { accessToken } = store.getState().token;
  if (accessToken === 'initial access token') {
    return redirect('/login');
  }
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

// export const exOfPost = {
//   id: 'id_1',
//   content: '오운완!',
//   postImages: [
//     'https://health.chosun.com/site/data/img_dir/2023/08/31/2023083102409_0.jpg',
//     'https://health.chosun.com/site/data/img_dir/2020/12/18/2020121801715_0.jpg',
//   ],
//   comments: [
//     {
//       name: 'seongyong',
//       image: 'https://cdn.imweb.me/thumbnail/20220211/b25f693cf8fa7.jpg',
//       comment: '운동하는 모습이 멋져요!',
//       reply: [
//         {
//           name: 'seo',
//           image: 'https://cdn.imweb.me/thumbnail/20220211/b25f693cf8fa7.jpg',
//           comment: '감사합니다!',
//         },
//         {
//           name: 'seo',
//           image: 'https://cdn.imweb.me/thumbnail/20220211/b25f693cf8fa7.jpg',
//           comment: '감사합니다!',
//         },
//       ],
//     },
//     {
//       name: 'somi',
//       image:
//         'https://i.pinimg.com/736x/ca/20/d3/ca20d334e0009893f75514e04b77d544.jpg',
//       comment: '멋지십니다!',
//       reply: [
//         {
//           name: 'seo',
//           image: 'https://cdn.imweb.me/thumbnail/20220211/b25f693cf8fa7.jpg',
//           comment: '감사합니다!',
//         },
//       ],
//     },
//     {
//       name: 'yaejun',
//       image: 'https://cdn.imweb.me/thumbnail/20220211/b25f693cf8fa7.jpg',
//       comment: '운동하는 모습이 멋져요!',
//     },
//   ],
//   likes: [
//     {
//       name: 'yaejun',
//       image: 'https://cdn.imweb.me/thumbnail/20220211/b25f693cf8fa7.jpg',
//     },
//     {
//       name: 'somi',
//       image:
//         'https://i.pinimg.com/736x/ca/20/d3/ca20d334e0009893f75514e04b77d544.jpg',
//     },
//     {
//       name: 'seongyong',
//       image: 'https://cdn.imweb.me/thumbnail/20220211/b25f693cf8fa7.jpg',
//     },
//   ],
//   hashtags: ['#운동', '#트레이닝', '#챌린지', '#운동'],
//   date: new Date().toISOString(),
//   profileImage: 'https://www.handmk.com/news/photo/202306/16714_40371_5250.jpg',
//   profileName: 'pys_99',
// };

const Post = () => {
  const PostDto = useLoaderData() as LoaderData<typeof loader>;

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
      <section className="w-[728px] space-y-12">
        {PostDto.data.content.map((post) => (
          <PostItem {...post} />
        ))}
      </section>
    </div>
  );
};

export const action = () => {
  return null;
};

export default Post;
