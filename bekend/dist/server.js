"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const MojRuter_1 = __importDefault(require("./MojRuter"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(__dirname));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/2022K2');
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log("DB ok");
});
const SaveFolder = 'uploads/';
var a = "";
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, SaveFolder); // Define the destination folder for uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Keep the original filename
        a = file.originalname;
    }
});
var ruter = MojRuter_1.default.route;
const upload = (0, multer_1.default)({ storage: storage });
app.post('/users/upload1', upload.single('file'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('No File');
        return next(error);
    }
    else {
        console.log(file.filename);
        res.send(file);
        a = file.originalname;
    }
});
app.get('/users/uploads/:filename', (req, res) => {
    let filename = req.params.filename;
    let imgPath = path_1.default.join(__dirname, '../../bekend/uploads', filename);
    console.log(imgPath);
    res.sendFile(imgPath);
});
const router = express_1.default.Router();
router.use('/users', MojRuter_1.default);
exports.default = a;
app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
