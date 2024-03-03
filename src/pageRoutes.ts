const mainRoutes = {
  base: '/',
  userNewPost: 'newpost',
};

const userPostRoutes = {
  base: 'post',
  detail: ':postId',
};

const userTrainingRoutes = {
  book: 'book',
  detail: ':trainingId',
  paymentSuccess: 'success/:reservationId',
};

const userRoutes = {
  base: 'user',
  profile: 'profile',
  edit: 'edit',
  posts: 'posts',
  reservations: 'reservations',
  cancellations: 'cancellations',
  trainerInfo: 'trainerInfo',
};

const trainerRoutes = {
  base: '/trainer',
  index: 'home',
  new: 'new',
  create: 'create',
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
  userPost: userPostRoutes,
  userTraining: userTrainingRoutes,
  trainer: trainerRoutes,
};

export default pageRoutes;
