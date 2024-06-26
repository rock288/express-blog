const express = require('express');
const articleController = require('../../controllers/article.controller');
const validate = require('../../middlewares/validate');
const articleValidation = require('../../validations/article.validation');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(articleValidation.createArticle), articleController.createArticle)
  .get(articleController.getArticles);

router
  .route('/:articleId')
  .delete(auth(), validate(articleValidation.createArticle), articleController.deleteArticle)
  .get(articleController.getArticle)
  .put(auth(), validate(articleValidation.createArticle), articleController.updateArticle);

module.exports = router;
