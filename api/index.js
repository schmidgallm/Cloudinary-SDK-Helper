// Dependencies
require('dotenv').config();
const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// init multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// init multer upload function taking in storage engin config as param
const upload = multer({ storage });

// @route    POST api/v1/auth/images/upload
// @desc     UPLOAD images
// @access   Private
router.post('/upload', upload.array('productImages', 20), async (req, res) => {
  try {
    // store path to uploads folder in variable to use later
    const directory = path.join(__dirname, '../uploads/');

    // read uploads directory and upload each image to cloudinary
    // once done remove from directory
    fs.readdir(directory, (err, files) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          msg: 'Error on File System Directory Read',
          alertType: 'alert-danger',
        });
      }

      // loop through the array of files
      files.forEach(file => {
        //  ignore .gitkeep file
        if (path.extname(file) === '.gitkeep') {
          return;
        }

        // post to cloudinary
        cloudinary.uploader
          .upload(directory + file, {
            folder: 'uploads',
            public_id: file.split('.')[0],
            unique_filename: false,
          })
          .then(result => {
            console.log(result);
          });
      });
    });

    // return response once all done
    return res.status(200).json({
      msg: 'Product and Image Saved Successfully',
      alertType: 'alert-success',
    });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
