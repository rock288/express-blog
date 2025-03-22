const express = require('express');
const uploadController = require('../../controllers/upload.controller');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');

const router = express.Router();

router.route('/').post(auth(), upload.single('image'), uploadController.createUpload);

module.exports = router;
