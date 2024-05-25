const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
const port = 3000;
const cloudinary = require("./services/cloudinary.js");
const upload = require("./utils/video.js")
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

app.use(cors());

app.use(express.urlencoded({limit:'50mb', extended:true })); //set urlencoded to true
app.use(express.json()); //set json to true
app.use(cors({origin: true, credentials: true})); 

app.get('/', (req, res) => {
  res.send('<h1>welcome to show-off</h1>')
})

app.post("/balance", async (req, res) => {
  try {
    const {address, chain} = req.body
    if(!address || !chain) return
    let balance;
    console.log(address);
      balance = await Moralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain 
      });

    const result = balance.raw;
   
    return res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    console.log("something went wrong");
    return res.status(400).json();
  }
});

app.post("/video_upload", upload.single('file'), async (req, res) => {
  try {
    if(!req.file) return
    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: 'video', format: 'mp4'})
    console.log(result)
    return res.status(200).json({ result: result.secure_url });
  } catch (e) {
    console.log(e);
    console.log("something went wrong");
    return res.status(400).json();
  }
});

Moralis.start({
  apiKey: process.env.MORALIS_API
}).then(() => {
  app.listen(port, () => {
    console.log(`${port} Listening for API Calls`);
  });
});