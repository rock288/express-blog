const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },

    // auth

    // category . Reactjs javacript
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
articleSchema.plugin(toJSON);
articleSchema.plugin(paginate);


/**
 * @typedef Article
 */
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
