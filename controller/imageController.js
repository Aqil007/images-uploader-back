const { cloudinary } = require("../utils/cloudinary");
const UserImage = require("../models/userimage");
const { response } = require("express");

exports.imageWithId = async (req, res) => {
  // const { resources } = await cloudinary.search
  //     .expression('folder:dev_setups')
  //     .sort_by('public_id', 'desc')
  //     .max_results(30)
  //     .execute();

  // const publicIds = resources.map((file) => file.public_id);
  if (req.params.userId) {
    const imagesData = await UserImage.find({ userId: req.params.userId });
    res.status(201).send(imagesData);
  } else {
    res.status(500).send({ msg: "Please refresh page", isSuccess: false });
  }
};
exports.imageUpload = async (req, res) => {
  try {
    const fileStr = req.body.fileStr;
    // cloudinary.uploader.destroy()
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setups",
    });
    const data = {
      image_url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
      userId: req.body.id,
    };
    // console.log(uploadResponse);
    const user_image = await UserImage.create(data);
    res.status(200).json({ msg: "success", data: user_image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};

// ================ delete image ============================

exports.deleteImage = async (req, res) => {
  try {
    const { public_id, id } = req.body;
    cloudinary.uploader.destroy(public_id, async () => {
      await UserImage.deleteOne({ _id: id })
        .then((response) => {
          if (response) {
            res
              .status(200)
              .json({ msg: "Deleted successfully.", isSuccess: true });
          }
        })
        .catch((err) => {
          res.status(500).json({ msg: err.message });
        });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};
