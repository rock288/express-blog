const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const uploadSchema = mongoose.Schema(
  {
    fieldname: {
      type: String,
      trim: true,
    },
    originalname: {
      type: String,
      trim: true,
    },
    encoding: {
      type: String,
      trim: true,
    },
    mimetype: {
      type: String,
      trim: true,
    },
    destination: {
      type: String,
      trim: true,
    },
    filename: {
      type: String,
      trim: true,
    },
    path: {
      type: String,
      trim: true,
    },
    size: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
uploadSchema.plugin(toJSON);
uploadSchema.plugin(paginate);

/**
 * @typedef Upload
 */
const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
