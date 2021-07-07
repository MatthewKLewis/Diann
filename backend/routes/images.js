const express = require("express");
const router = express.Router();
const cors = require("cors");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const Image = require("../models/image.model");

//configure multer
var storage = multer.diskStorage({
  destination: function(req,file,callback) {
    callback(null, '../files');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })
upload = multer({ dest: 'uploads/' });

//CREATE
router.post("/create", (req, res, next) => {
  let newImage = new Image({
    name: req.body.name,
    desc: req.body.desc,
    date: req.body.date,
    userId: req.body.userId,
    img: req.body.img,
  });
  newImage.save().then((data) => {
    res.json(data);
  });
});

router.post(
  "/createImageData",
  upload.single("file"), function (req, res, next) {
    console.log(req.file)
    return res.json({message: 'ok.'})
  }
)

//READ
router.get(
  "/all/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Image.find({ userId: req.params.userId }).then((images) => {
      res.json(images);
    });
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Image.findById(req.params.id).then((image) => {
      res.json(image);
    });
  }
);

//UPDATE

//DESTROY
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Image.findByIdAndDelete(req.params.id).then((image) => {
      res.json(image);
    });
  }
);

module.exports = router;
