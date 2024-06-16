const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//mongodb+srv://shreyas:<password>@cluster0.ealgmik.mongodb.net/

mongoose.connect(
  "mongodb+srv://tester:shreyas@cluster0.ealgmik.mongodb.net/e-commerce"
);

app.get("/",(req,res)=>{
    res.send("Express app is running");
})
//Image Storage Engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      console.log(file);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: storage})
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:4000/images/${req.file.filename}`
    })
})
app.listen(port,(error)=>{
    if(!error){
        console.log('Server running on port',+port);
    }
    else{
        console.log("Error"+error);
    }

})