const multer = require("multer");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {

    cb(null, true);
  },
});