const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { convertTitleToHref } = require('../utils/common');

const uploadDir = 'uploads/';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        '-' +
        convertTitleToHref(path.basename(file.originalname, path.extname(file.originalname))) +
        path.extname(file.originalname),
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
