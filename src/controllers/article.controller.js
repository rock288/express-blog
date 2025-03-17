const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { articleService } = require('../services');
const { OK } = require('../utils/ApiSuccess');

const createArticle = catchAsync(async (req, res) => {
  const article = await articleService.createArticle(req.body);

  OK(res, 'success', article);
});

const getArticles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'category.name,user.name';
  options.sortBy = 'createdAt:desc';
  const result = await articleService.queryArticles(filter, options);
  OK(res, 'success', result);
});

const getArticle = catchAsync(async (req, res) => {
  const article = await articleService.getArticleById(req.params.articleId);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
  }
  OK(res, 'success', article);
});

const getArticleByHref = catchAsync(async (req, res) => {
  const article = await articleService.getArticleByHref(req.params.articleHref);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
  }
  OK(res, 'success', article);
});

const updateArticle = catchAsync(async (req, res) => {
  const article = await articleService.updateArticleById(req.params.articleId, req.body);
  OK(res, 'success', article);
});

const deleteArticle = catchAsync(async (req, res) => {
  await articleService.deleteArticleById(req.params.articleId);
  OK(res, 'success');
});

module.exports = {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  getArticleByHref,
};
