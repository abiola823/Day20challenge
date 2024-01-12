const express  =  require('express');
const {request} = require('./middlware/middleware.js');
const app = express();
const dotenv = require('dotenv');
const db = require('./config/db.js');
const router = require('./Routes/userRoutes.js');
const { notFound, errorHandler } = require('./middlware/errorMiddleware.js');
const cookieParser = require('cookie-parser');
const path = require('path');
const multer = require('multer');
const {Server} = require('socket.io'); 
const {createServer} = require('http');
const httpServer = createServer(app);
const io = new Server(httpServer);
const uploadCollection = require('./Model/uploads.js');
const cors = require("cors");
const userRoute = router;

app.use( express.static(path.join(__dirname,'public')));

dotenv.config()

const PORT = process.env.PORT || 3000;

// create a connection to mongodb
db();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'uploads')); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
    }
  });
  const upload = multer({ storage: storage });

  app.use(cors({
    origin: "*"
  })); 
    // Route to handle file upload
  app.post('/upload', upload.single('pictureName'), async(req, res) => {
    if (!req.file) {
      return res.status(400).send('No files were uploaded.');
    }
          await uploadCollection.create({
            pictureName: req.file.originalname,
            path: req.file.destination

          });
          res.send('uploaded successfully')
  });

  io.on("connection", (socket) => {
    console.log(socket.id);
  
    socket.on("send-message", (payload, callback) => {
      console.log(payload);
  
      socket.to(payload.sendTo).emit("new-message", {
        message: payload.message
      });
  
      callback({
        successful: true,
        message: "Your message has been sent"
      });
    });
  
  });
  


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(request);// custom middleware to log the date to the console
app.use(cookieParser());

app.use('/user', userRoute);

app.use(notFound);
app.use(errorHandler);









// Creating a server using express the expressjs framework
httpServer.listen(PORT, function() {
  console.log("REST and socket.io listening on port", PORT);
});


