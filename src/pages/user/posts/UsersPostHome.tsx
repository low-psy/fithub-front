import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PostOutletProps } from 'types/common';
import useInfiniteScroll from 'hooks/infiniteScroll';
import { PostInfoDto } from 'types/swagger/model/postInfoDto';
import PostContainer from 'pages/post/PostContainer';

const UsersPost = () => {
  const { getLikeAndBookInfo, fetchData, last, postInfo, page } =
    useOutletContext<PostOutletProps>();
  const { data, loaderIndicator } = useInfiniteScroll<PostInfoDto>({
    initialData: postInfo || [],
    fetchData,
    last,
    page,
  });

  useEffect(() => {
    getLikeAndBookInfo(data);
  }, [getLikeAndBookInfo, data]);
  return <PostContainer data={data} loaderIndicator={loaderIndicator} />;
};

export default UsersPost;
