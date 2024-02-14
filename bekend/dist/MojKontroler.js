"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MojKontroler = void 0;
const student_1 = __importDefault(require("./model/student"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const teacher_1 = __importDefault(require("./model/teacher"));
//import storage from './src/server'
// import UserModel from './UserModel'
// import OrderModel from './OrderModel'
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract fields from the User object
            const { username, password, securityQuestion, securityAnswer, firstName, lastName, gender, address, contactPhone, email, profileImage, // Assuming it's a Buffer
            schoolType, currentGrade } = user;
            // Create a new Student object
            const newStudent = new student_1.default({
                username,
                password,
                securityQuestion,
                securityAnswer,
                firstName,
                lastName,
                gender,
                address,
                contactPhone,
                email,
                profileImage,
                schoolType,
                currentGrade
            });
            let kripto = yield bcrypt_1.default.hash(newStudent.password, 1);
            newStudent.password = kripto;
            // Save the Student object to the database
            const savedStudent = yield newStudent.save();
            return savedStudent;
        }
        catch (error) {
            console.error('Error creating student:', error);
            return null;
        }
    });
}
function createTeacher(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract fields from the User object
            const { username, password, securityQuestion, securityAnswer, firstName, lastName, gender, address, contactPhone, email, profileImage, // Assuming it's a Buffer
             } = data.user;
            let selectedSubjects = data.selectedSubjects;
            let selectedYear = data.selectedYear;
            let freeText = data.tekst;
            let CV = data.file;
            let status = 0;
            // Create a new Student object
            const newStudent = new teacher_1.default({
                username,
                password,
                securityQuestion,
                securityAnswer,
                firstName,
                lastName,
                gender,
                address,
                contactPhone,
                email,
                profileImage,
                selectedSubjects,
                selectedYear,
                freeText,
                CV,
                status
            });
            let kripto = yield bcrypt_1.default.hash(newStudent.password, 1);
            newStudent.password = kripto;
            // Save the Student object to the database
            selectedSubjects.forEach((element) => {
                newStudent.wantedSubjects.push(element);
            });
            selectedYear.forEach((element) => {
                newStudent.wantedClass.push(element);
            });
            const savedStudent = yield newStudent.save();
            return savedStudent;
        }
        catch (error) {
            console.error('Error creating teacher:', error);
            return null;
        }
    });
}
class MojKontroler {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            student_1.default.findOne({ username: username, password: password }).then((data) => res.json(data))
                .catch((err) => {
                console.log(err);
            });
        };
        this.loginT = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            student_1.default.findOne({ username: username, password: password }).then((data) => res.json(data))
                .catch((err) => {
                console.log(err);
            });
        };
        // Orders = (req:express.Request,res:express.Response)=>{
        //    // let username=req.body.username
        //    // let password = req.body.password
        //     OrderModel.find({}).then(
        //         (data)=> res.json(data)
        //     )
        //     .catch((err)=>{console.log(err)
        //     })
        // }
        // upload = (req:express.Request,res:express.Response)=>{
        //          upload.single('file')
        //         const file = req.file;
        //         if (!file) {
        //           res.send("Greska")
        //         }
        //         else {console.log(file.filename);
        //         this.a=file.originalname;
        //           res.send(file);}
        //       }
        this.Register = (req, res) => {
            createUser(req.body);
        };
        this.RegisterT = (req, res) => {
            console.log(req.body);
            createTeacher(req.body);
        };
    }
}
exports.MojKontroler = MojKontroler;
