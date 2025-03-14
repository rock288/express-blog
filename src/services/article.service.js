const httpStatus = require('http-status');
const { Article } = require('../models');
const ApiError = require('../utils/ApiError');
const { convertTitleToHref } = require('../utils/common');

/**
 * Create a article
 * @param {Object} articleBody
 * @returns {Promise<Article>}
 */
const createArticle = async (articleBody) => {
  articleBody.href = convertTitleToHref(articleBody.title);
  return Article.create(articleBody);
};

/**
 * Query for articles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryArticles = async (filter, options) => {
  const articles = await Article.paginate(filter, options);
  return articles;
};

/**
 * Get article by id
 * @param {ObjectId} id
 * @returns {Promise<Article>}
 */
const getArticleById = async (id) => {
  return Article.findById(id).populate([
    {
      path: 'category',
    },
    {
      path: 'user',
      select: 'id name',
    },
  ]);
};

/**
 * Get article by id
 * @param {ObjectId} id
 * @returns {Promise<Article>}
 */
const getArticleByHref = async (href) => {
  return Article.findOne({ href, isShow: true }).populate([
    {
      path: 'category',
    },
    {
      path: 'user',
      select: 'id name',
    },
  ]);
};

/**
 * Update article by id
 * @param {ObjectId} articleId
 * @param {Object} updateBody
 * @returns {Promise<Article>}
 */
const updateArticleById = async (articleId, updateBody) => {
  const article = await getArticleById(articleId);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
  }
  Object.assign(article, updateBody);
  await article.save();
  return article;
};

/**
 * Delete article by id
 * @param {ObjectId} articleId
 * @returns {Promise<Article>}
 */
const deleteArticleById = async (articleId) => {
  const article = await Article.findOneAndDelete({ _id: articleId });
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
  }
  // await article.remove();
  return article;
};

module.exports = {
  createArticle,
  queryArticles,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  getArticleByHref,
};
