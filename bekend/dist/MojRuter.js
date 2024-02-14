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
MojRuter.route('/loginTeacher').post((req, res) => new MojKontroler_1.MojKontroler().loginT(req, res));
MojRuter.route('/register').post((req, res) => new MojKontroler_1.MojKontroler().Register(req, res));
MojRuter.route('/registerTeacher').post((req, res) => new MojKontroler_1.MojKontroler().RegisterT(req, res));
exports.default = MojRuter;
