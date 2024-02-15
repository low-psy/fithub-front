const mainRoutes = {
  base: '/',
  newPost: 'newpost',
  post: 'post',
  postDetail: ':postId',
};

const userRoutes = {
  base: 'user',
  profile: 'profile',
  edit: 'edit',
  posts: 'posts',
  reservations: 'reservations',
  cancellations: 'cancellations',
};

const helpRoutes = {
  base: '/help',
  forgetPassword: 'password',
};

const signupRoutes = {
  base: '/signup',
  emailAuthentication: 'email',
  additionalInfo: 'additional-info',
  success: 'success',
};

const pageRoutes = {
  main: mainRoutes,
  login: '/login',
  help: helpRoutes,
  signup: signupRoutes,
  socialSignup: 'ouath2/regist',
  certifyTrainer: 'certify-trainer',
  user: userRoutes,
};

export default pageRoutes;
