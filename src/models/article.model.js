const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    href: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isShow: {
      type: Boolean,
      required: true,
      default: true,
    },
    // auth
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // category . Reactjs javacript
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
articleSchema.plugin(toJSON);
articleSchema.plugin(paginate);

articleSchema.index({ href: 1 });

/**
 * @typedef Article
 */
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
