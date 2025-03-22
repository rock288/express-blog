const express = require('express');
const articleRoute = require('./article.route');
const categoryRoute = require('./category.route');
const uploadRoute = require('./upload.route');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/article',
    route: articleRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/upload',
    route: uploadRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
