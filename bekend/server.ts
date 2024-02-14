import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import multer from 'multer';
import MojRuter from './MojRuter';

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname));

mongoose.connect('mongodb://127.0.0.1:27017/2022K2')
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("DB ok")
})
const SaveFolder='uploads/';
var a=""

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null,SaveFolder ); // Define the destination folder for uploads
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname); // Keep the original filename
      a=file.originalname
  }
});
var ruter=MojRuter.route
const upload = multer({ storage: storage })

app.post('/users/upload1', upload.single('file'), (req, res, next) => {
  const file = req.file;
  
  if (!file) {
    const error = new Error('No File')
    
    return next(error)
  }
  else{ console.log(file.filename);
    res.send(file);
    a=file.originalname
  }
})
const router = express.Router()
router.use('/users', MojRuter)
export default a;
app.use("/" ,router)

app.listen(4000, () => console.log(`Express server running on port 4000`));