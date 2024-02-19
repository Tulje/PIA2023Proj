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
const admin_1 = __importDefault(require("./model/admin"));
const cas_1 = __importDefault(require("./model/cas"));
const predmeti_1 = __importDefault(require("./model/predmeti"));
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
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let username = req.body.username;
            let password = yield bcrypt_1.default.hash(req.body.password, 1);
            console.log(password);
            student_1.default.findOne({ username: username }).then((data) => __awaiter(this, void 0, void 0, function* () {
                if (data) {
                    let flag = yield bcrypt_1.default.compare(req.body.password, data.password);
                    console.log(flag);
                    if (flag) {
                        console.log(data);
                        res.json(data);
                    }
                    else {
                        res.json(null);
                    }
                }
                else {
                    res.json(null);
                }
            }))
                .catch((err) => {
                console.log(err);
            });
        });
        this.loginA = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let username = req.body.username;
            let password = yield bcrypt_1.default.hash(req.body.password, 1);
            console.log(password);
            admin_1.default.findOne({ username: username }).then((data) => __awaiter(this, void 0, void 0, function* () {
                if (data) {
                    console.log(data);
                    res.json(data);
                }
                else {
                    res.json(null);
                }
            }))
                .catch((err) => {
                console.log(err);
            });
        });
        this.loginT = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let username = req.body.username;
            teacher_1.default.findOne({ username: username }).then((data) => __awaiter(this, void 0, void 0, function* () {
                if (data) {
                    let flag = yield bcrypt_1.default.compare(req.body.password, data.password);
                    console.log(flag);
                    if (flag) {
                        console.log(data);
                        res.json(data);
                    }
                    else {
                        res.json(null);
                    }
                }
                else {
                    res.json(null);
                }
            }))
                .catch((err) => {
                console.log(err);
            });
        });
        this.sviPredmeti = (req, res) => {
            predmeti_1.default.find({}).then(data => res.json(data));
        };
        this.teachers = (req, res) => {
            teacher_1.default.find({}).then(data => res.json(data));
        };
        this.students = (req, res) => {
            student_1.default.find({}).then(data => res.json(data));
        };
        this.pretragaTeachera = (req, res) => {
            teacher_1.default.find({}).then(data => res.json(data));
        };
        this.updateStudent = (req, res) => {
            let user = req.body.user;
            student_1.default.findOneAndUpdate({
                username: user.username
            }, { $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    contactPhone: user.contactPhone,
                    email: user.email,
                    profileImage: user.profileImage,
                    schoolType: user.schoolType,
                    currentGrade: user.currentGrade,
                } }).then(r => { console.log(r); res.json(r); });
        };
        this.updateTeacher = (req, res) => {
            let user = req.body.nastavnik;
            teacher_1.default.findOneAndUpdate({
                username: user.username
            }, { $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    contactPhone: user.contactPhone,
                    email: user.email,
                    profileImage: user.profileImage,
                    wantedClass: user.wantedClass,
                    wantedSubjects: user.wantedSubjects
                } }).then(r => { console.log(r); res.json(r); });
        };
        this.PrihvatiNastavnika = (req, res) => {
            let user = req.body.user;
            teacher_1.default.findOneAndUpdate({
                username: user.username
            }, { $set: {
                    status: 1
                } }).then(r => { console.log(r); res.json(r); });
        };
        this.sviCasovi = (req, res) => {
            cas_1.default.find({}).then(data => res.json(data));
        };
        this.prihvatiCas = (req, res) => {
            cas_1.default.findOneAndUpdate({ user: req.body.cas.user, teacher: req.body.cas.teacher, datetime: req.body.cas.datetime }, {
                $set: { status: "Prihvacen" }
            }).then(data => res.json(data));
        };
        this.odbijCas = (req, res) => {
            cas_1.default.findOneAndDelete({ user: req.body.cas.user }).then(data => res.json(data));
        };
        this.OdbijNastavnika = (req, res) => {
            let user = req.body.user;
            teacher_1.default.findOneAndUpdate({
                username: user.username
            }, { $set: {
                    status: -1
                } }).then(r => { console.log(r); res.json(r); });
        };
        this.ZahtevajCas = (req, res) => {
            console.log(req.body.IzabranPredmet);
            let pocetakRadnog = new Date(req.body.datetime);
            pocetakRadnog.setHours(11, 0, 0, 0);
            let krajRadnog = new Date(req.body.datetime);
            krajRadnog.setHours(19, 0, 0, 0);
            let datum = new Date(req.body.datetime);
            console.log(datum);
            let datumKraj = new Date(req.body.datetime);
            if (req.body.dupli) {
                datumKraj.setHours(datum.getHours() + 2);
            }
            else {
                datumKraj.setHours(datum.getHours() + 1);
            }
            console.log(req.body.double);
            if (datum < pocetakRadnog || datum > krajRadnog) {
                res.json({ message: "Van radnog vremena" });
                return;
            }
            let fleg = 0;
            cas_1.default.find({ teacher: req.body.teacher }).then(data => {
                data.forEach(el => {
                    if (datum >= el.datetime && datum <= el.end)
                        fleg = 1;
                    else if (datumKraj >= el.datetime && datumKraj <= el.end)
                        fleg = 1;
                });
                if (fleg == 1) {
                    res.json({ message: "Nastavnik ima cas za to vreme" });
                }
                else {
                    let a = new cas_1.default();
                    a.double = req.body.dupli;
                    a.user = req.body.user;
                    a.teacher = req.body.teacher;
                    a.datetime = req.body.datetime;
                    a.subject = req.body.IzabranPredmet;
                    a.end = datumKraj;
                    a.status = "neodobren";
                    a.save();
                    res.json({ message: "Uspesno zahtevan cas, ceka potvrdu" });
                }
            });
        };
        this.nadjiKorisnika = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            console.log(username, password);
            student_1.default.findOne({ username: username }).then((data) => __awaiter(this, void 0, void 0, function* () {
                console.log(data);
                if (data) {
                    let a = yield bcrypt_1.default.compare(password, data.password);
                    console.log("student" + a);
                    if (a)
                        res.json(data);
                    else
                        res.json(null);
                }
                else {
                    teacher_1.default.findOne({ username: username }).then((data) => __awaiter(this, void 0, void 0, function* () {
                        console.log(data);
                        if (data) {
                            let a = yield bcrypt_1.default.compare(password, data.password);
                            if (a)
                                res.json(data);
                            else
                                res.json(null);
                        }
                        else {
                            res.json(null);
                        }
                    }));
                }
            }));
        };
        this.promeniSifru = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let password = yield bcrypt_1.default.hash(req.body.password, 1);
            let username = req.body.username;
            teacher_1.default.findOne({ username: username }).then((data) => __awaiter(this, void 0, void 0, function* () {
                if (data) {
                    let flag = yield bcrypt_1.default.compare(req.body.passwordStara, data.password);
                    console.log(flag);
                    if (flag) {
                        console.log(data);
                        teacher_1.default.findOneAndUpdate({ username: username }, {
                            $set: { password: password }
                        }).then();
                        res.json({ "message": "Uspeh" });
                    }
                    else {
                        res.json(null);
                    }
                }
                else {
                    student_1.default.findOne({ username: username }).then((data) => __awaiter(this, void 0, void 0, function* () {
                        if (data) {
                            let flag = yield bcrypt_1.default.compare(req.body.passwordStara, data.password);
                            console.log(flag);
                            if (flag) {
                                console.log(data);
                                student_1.default.findOneAndUpdate({ username: username }, {
                                    $set: { password: password }
                                }).then();
                                res.json({ "message": "Uspeh" });
                            }
                            else {
                                res.json(null);
                            }
                        }
                        else {
                            res.json(null);
                        }
                    }))
                        .catch((err) => {
                        console.log(err);
                    });
                }
            }))
                .catch((err) => {
                console.log(err);
            });
        });
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
