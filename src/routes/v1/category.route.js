const express = require('express');
const categoryController = require('../../controllers/category.controller');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(categoryValidation.createCategory), categoryController.createCategory)
  .get(categoryController.getCategories);

router
  .route('/:categoryId')
  .delete(auth(), validate(categoryValidation.deleteCategory), categoryController.deleteCategory)
  .get(categoryController.getCategory)
  .put(auth(), validate(categoryValidation.updateCategory), categoryController.updateCategory);

module.exports = router;
