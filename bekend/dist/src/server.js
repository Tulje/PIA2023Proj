"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// var storage=multer.diskStorage( {destination: function (req, file, cb) {
//     cb(null, '/tmp/my-uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }})
// mongoose.connect('mongodb://127.0.0.1:27017/2022K2')
// const upload = multer({ storage: storage });
// const conn = mongoose.connection
// conn.once('open',()=>console.log("DB ok"))
// export default storage
// const ruter=express.Router()
// app.post("/users/upload",(req, res) => {
// upload.single('file')
// console.log("apload");
// res.send('File uploaded successfully');})
app.post('/users/upload1', (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('No File');
        return next(error);
    }
    else {
        console.log(file.filename);
    }
    res.send(file);
});
app.listen(4000, () => console.log(`Express server running on port 4000`));
