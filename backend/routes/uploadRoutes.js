import express from 'express';
import path from 'path';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // Format the name of the file
    // path.extname() extracts the extension of the original filename
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;

  // Test the file extension on the filetypes expression
  // Return true if the extension of the file is jpg, jpeg or png
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  // Check the mime type of the file to make sure that the file submitted is an image
  // And not something else
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Route handler for single file uploads using Multer middleware
// Returns the file path as the response
router.post('/', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send(`/${req.file.path}`);
});

export default router;
