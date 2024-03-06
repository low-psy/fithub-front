import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PostOutletProps } from '../../types/post';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import { PostInfoDto } from '../../types/swagger/model/postInfoDto';
import PostContainer from './PostContainer';

const PostExplore = () => {
  const { getLikeAndBookInfo, fetchData, last, postInfo } =
    useOutletContext<PostOutletProps>();
  const { data, loaderIndicator } = useInfiniteScroll<PostInfoDto>({
    initialData: postInfo || [],
    fetchData,
    last,
  });
  useEffect(() => {
    getLikeAndBookInfo(data);
  }, [getLikeAndBookInfo, data]);
  return <PostContainer data={data} loaderIndicator={loaderIndicator} />;
};

export default PostExplore;
