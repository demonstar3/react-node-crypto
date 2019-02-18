const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const keys = require("../config/keys");
const path = require("path");
//IMAGE UPLOAD
aws.config.update({
  // Your SECRET ACCESS KEY from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
  secretAccessKey: keys.SecretAccessKey,
  // Not working key, Your ACCESS KEY ID from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
  accessKeyId: keys.AccessKeyID,
  region: "us-east-2" // region of your bucket
});
const s3 = new aws.S3();
const storage = multerS3({
  s3: s3,
  bucket: "crypto-net",
  acl: "public-read",
  metadata: function(req, file, cb) {
    cb(null, { fieldName: file.originalname });
  },
  key: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

// Check File Type
function checkFileType(file, cb) {
  console.log(`file: ${file}`);
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

module.exports = {
  checkFileType: checkFileType,
  storage: storage
};
