const express = require("express");
const mongoose = require('mongoose');
const app = express();
const Post = require("./post.js")
const cors = require("cors");
const multer = require("multer");
const path = require('path');
const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use( express.static("upload"))
const connectDB = async () => {

    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect("mongodb://admin:dj3LHcLzjdyMH!1dMR9z@remote.runflare.com:30666/?authMechanism=DEFAULT&authSource=admin", {
      
      });
    
      console.log('MongoDB is Connected...');
    } catch (err) {
      console.log('MongoDB is notConnected...');

      console.error(err.message);
      process.exit(1);
    }
  //   Item.createCollection().then(function (collection) {
  //     console.log('Collection is created!');
  // });
  };
  connectDB()
// app.use(require("./routes/record"));
// get driver connection
// const dbo = require("./db/conn");
const mainMail =(name, email, subject, message) =>  {
    const transporter =  nodemailer.createTransport({
      service: "smtp-de-01.runflare.com",
      
      auth: {
        user: "info@bonyankala.com",
        pass: "bonyan@110",
      },
    });
    const mailOption = {
      from: "info@bonyankala.com",
      to: "holyps4@gmail.com",
      subject: "subjict",
      html: `You got a message from 
      Email : dda
      Name: dasfas
      Message: asdasdas`,
    };
    try {
     transporter.sendMail(mailOption);
      return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
      return Promise.reject(error);
    }
  }
app.listen(port, () => {
    const storage = multer.diskStorage({
        destination: function(req , file,cb) {
            cb(null , "upload")
        },
        filename : function(req , file ,cb){
            cb(null,Date.now() + path.extname(file.originalname));
        }
    }
    );
    const fileFilter = (req , file , cb) => {
        const allowedFiletypes = ["image/jpeg" , "image/jpg" , "image/png"]
        if(allowedFiletypes.includes(file.mimetype)){
            cb(null , true)
        } else {
            cb(null , false)
        }
    }
    let upload = multer({storage , fileFilter})

    app.post('/',upload.single('image') , (req, res) => {

     console.log("hi");

     console.log(req.body);
      
        req.body.image = req.file.filename
        Post.create(req.body )
          .then(book => res.json({ msg: 'Book added successfully' }))
          .catch(err => res.status(400).json({ error: 'Unable to add this book' }));
      });

      app.get('/', (req, res) => {
        Post.find()
            .then(Post => res.json(Post))
            .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
        });
          app.delete('/:id', (req, res) => {
            Post.deleteOne({_id :req.params.id})
      .then(book => res.json({ mgs: 'Book entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such a book' }));
  });
  app.post('/mail', (req, res) => {
    mainMail()
});
  // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
//    });
// app.get('/', (req, res) => res.send('Hello world!'));
  console.log(`Server is running on port: ${port}`);
});