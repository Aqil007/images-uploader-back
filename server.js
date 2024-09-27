const { cloudinary } = require("./utils/cloudinary");
const express = require("express");
const app = express();
var cors = require("cors");
const connectDatabase = require("./config/database");
const UserImage = require("./models/userimage");
const router = require("./routes");

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
connectDatabase();

app.use("/api", router);
// app.get('/api/images/:userId', async (req, res) => {
//     // const { resources } = await cloudinary.search
//     //     .expression('folder:dev_setups')
//     //     .sort_by('public_id', 'desc')
//     //     .max_results(30)
//     //     .execute();

//     // const publicIds = resources.map((file) => file.public_id);
//    const imagesData = await UserImage.find({userId:req.params.userId})
//     res.send(imagesData);
// });
// app.post('/api/upload', async (req, res) => {
//     try {
//         const fileStr = req.body.data;
//         const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//             upload_preset: 'dev_setups',
//         });
//         const data = {
//             image_url:uploadResponse.public_id,
//             userId:"test1"
//         }
//         // console.log(uploadResponse);
//         const user_image = await UserImage.create(data);
//         console.log("data====",user_image);
//         res.json({ msg: 'success', data:user_image });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ err: 'Something went wrong' });
//     }
// });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("listening on 3001");
});
