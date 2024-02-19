"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MojKontroler_1 = require("./MojKontroler");
const MojRuter = express_1.default.Router();
// MojRuter.route('/upload1').post( (req, res) => new MojKontroler().upload(req,res)
// )
MojRuter.route('/login').post((req, res) => new MojKontroler_1.MojKontroler().login(req, res));
MojRuter.route('/loginA').post((req, res) => {
    new MojKontroler_1.MojKontroler().loginA(req, res);
});
MojRuter.route('/loginTeacher').post((req, res) => new MojKontroler_1.MojKontroler().loginT(req, res));
MojRuter.route('/register').post((req, res) => new MojKontroler_1.MojKontroler().Register(req, res));
MojRuter.route('/registerTeacher').post((req, res) => new MojKontroler_1.MojKontroler().RegisterT(req, res));
MojRuter.route('/teachers').post((req, res) => new MojKontroler_1.MojKontroler().teachers(req, res));
MojRuter.route('/students').post((req, res) => new MojKontroler_1.MojKontroler().students(req, res));
MojRuter.route('/pretragaTeachera').post((req, res) => new MojKontroler_1.MojKontroler().pretragaTeachera(req, res));
MojRuter.route('/updateStudent').post((req, res) => new MojKontroler_1.MojKontroler().updateStudent(req, res));
MojRuter.route('/azurirajNastavnika').post((req, res) => new MojKontroler_1.MojKontroler().updateTeacher(req, res));
MojRuter.route('/PrihvatiNastavnika').post((req, res) => new MojKontroler_1.MojKontroler().PrihvatiNastavnika(req, res));
MojRuter.route('/OdbijNastavnika').post((req, res) => new MojKontroler_1.MojKontroler().OdbijNastavnika(req, res));
MojRuter.route('/ZahtevajCas').post((req, res) => new MojKontroler_1.MojKontroler().ZahtevajCas(req, res));
MojRuter.route('/sviCasovi').post((req, res) => new MojKontroler_1.MojKontroler().sviCasovi(req, res));
MojRuter.route('/prihvatiCas').post((req, res) => new MojKontroler_1.MojKontroler().prihvatiCas(req, res));
MojRuter.route('/odbijCas').post((req, res) => new MojKontroler_1.MojKontroler().odbijCas(req, res));
MojRuter.route('/nadjiKorisnika').post((req, res) => new MojKontroler_1.MojKontroler().nadjiKorisnika(req, res));
MojRuter.route('/promeniSifru').post((req, res) => new MojKontroler_1.MojKontroler().promeniSifru(req, res));
MojRuter.route('/sviPredmeti').post((req, res) => new MojKontroler_1.MojKontroler().sviPredmeti(req, res));
exports.default = MojRuter;
