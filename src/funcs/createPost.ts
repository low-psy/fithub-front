import axios from 'axios';

interface createPost {
  (data: {
    title: string;
    content: string;
    image: string;
    keyword: string;
  }): any;
}

const cratePost: createPost = (data) => {
  return axios({
    url: '/user/post',
    method: 'post',
    baseURL: 'http://15.165.22.187',
    headers: {
      Authorization: 'any',
    },
    data: data,
  });
};

export default cratePost;
