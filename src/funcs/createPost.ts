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
  return axios.post('/user', data, {});
};

export default cratePost;
