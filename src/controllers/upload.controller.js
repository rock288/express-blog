const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { uploadService } = require('../services');
const { OK } = require('../utils/ApiSuccess');

const createUpload = catchAsync(async (req, res) => {
  const upload = await uploadService.createUpload(req.file);
  OK(res, 'success', upload);
});

const getUploads = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await uploadService.queryUploads({}, options);
  OK(res, 'success', result);
});

const getUpload = catchAsync(async (req, res) => {
  const upload = await uploadService.getUploadById(req.params.uploadId);
  if (!upload) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Upload not found');
  }
  OK(res, 'success', upload);
});

const updateUpload = catchAsync(async (req, res) => {
  const upload = await uploadService.updateUploadById(req.params.uploadId, req.body);
  OK(res, 'success', upload);
});

const deleteUpload = catchAsync(async (req, res) => {
  await uploadService.deleteUploadById(req.params.uploadId);
  OK(res, 'success');
});

module.exports = {
  createUpload,
  getUploads,
  getUpload,
  updateUpload,
  deleteUpload,
};
