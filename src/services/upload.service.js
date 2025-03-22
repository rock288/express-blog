const httpStatus = require('http-status');
const { Upload } = require('../models');
const ApiError = require('../utils/ApiError');
const { convertTitleToHref } = require('../utils/common');

/**
 * Create a upload
 * @param {Object} uploadBody
 * @returns {Promise<Upload>}
 */
const createUpload = async (uploadBody) => {
  return Upload.create(uploadBody);
};

/**
 * Query for uploads
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUploads = async (filter, options) => {
  const uploads = await Upload.paginate(filter, options);
  return uploads;
};

/**
 * Get upload by id
 * @param {ObjectId} id
 * @returns {Promise<Upload>}
 */
const getUploadById = async (id) => {
  return Upload.findById(id);
};

/**
 * Update upload by id
 * @param {ObjectId} uploadId
 * @param {Object} updateBody
 * @returns {Promise<Upload>}
 */
const updateUploadById = async (uploadId, updateBody) => {
  const upload = await getUploadById(uploadId);
  if (!upload) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Upload not found');
  }
  Object.assign(upload, updateBody);
  await upload.save();
  return upload;
};

/**
 * Delete upload by id
 * @param {ObjectId} uploadId
 * @returns {Promise<Upload>}
 */
const deleteUploadById = async (uploadId) => {
  const upload = await Upload.findOneAndDelete({ _id: uploadId });
  if (!upload) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Upload not found');
  }
  // await upload.remove();
  return upload;
};

module.exports = {
  createUpload,
  queryUploads,
  getUploadById,
  updateUploadById,
  deleteUploadById,
};
