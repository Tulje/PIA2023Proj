import express from 'express'
import { MojKontroler } from './MojKontroler'

const MojRuter= express.Router()
// MojRuter.route('/upload1').post( (req, res) => new MojKontroler().upload(req,res)
// )
MojRuter.route('/login').post(
    (req,res)=>new MojKontroler().login(req,res)
)
MojRuter.route('/loginTeacher').post(
    (req,res)=>new MojKontroler().loginT(req,res)
)
MojRuter.route('/register').post(
    (req,res)=>new MojKontroler().Register(req,res)
)
MojRuter.route('/registerTeacher').post(
    (req,res)=>new MojKontroler().RegisterT(req,res)
)
export default MojRuter;