import express from 'express'
import { MojKontroler } from './MojKontroler'

const MojRuter= express.Router()
// MojRuter.route('/upload1').post( (req, res) => new MojKontroler().upload(req,res)
// )
MojRuter.route('/login').post(
    (req,res)=>new MojKontroler().login(req,res)
)
MojRuter.route('/loginA').post(
    
    (req,res)=>{new MojKontroler().loginA(req,res)
})
MojRuter.route('/loginTeacher').post(
    (req,res)=>new MojKontroler().loginT(req,res)
)
MojRuter.route('/register').post(
    (req,res)=>new MojKontroler().Register(req,res)
)
MojRuter.route('/registerTeacher').post(
    (req,res)=>new MojKontroler().RegisterT(req,res)
)
MojRuter.route('/teachers').post(
    (req,res)=>new MojKontroler().teachers(req,res)
)
MojRuter.route('/students').post(
    (req,res)=>new MojKontroler().students(req,res)
)
MojRuter.route('/pretragaTeachera').post(
    (req,res)=>new MojKontroler().pretragaTeachera(req,res)
)
MojRuter.route('/updateStudent').post(
    (req,res)=>new MojKontroler().updateStudent(req,res)
)
MojRuter.route('/azurirajNastavnika').post(
    (req,res)=>new MojKontroler().updateTeacher(req,res)
)
MojRuter.route('/PrihvatiNastavnika').post(
    (req,res)=>new MojKontroler().PrihvatiNastavnika(req,res)
)
MojRuter.route('/OdbijNastavnika').post(
    (req,res)=>new MojKontroler().OdbijNastavnika(req,res)
)
MojRuter.route('/ZahtevajCas').post(
    (req,res)=>new MojKontroler().ZahtevajCas(req,res)
)
MojRuter.route('/sviCasovi').post(
    (req,res)=>new MojKontroler().sviCasovi(req,res)
)
MojRuter.route('/prihvatiCas').post(
    (req,res)=>new MojKontroler().prihvatiCas(req,res)
)
MojRuter.route('/odbijCas').post(
    (req,res)=>new MojKontroler().odbijCas(req,res)
)
MojRuter.route('/nadjiKorisnika').post(
    (req,res)=>new MojKontroler().nadjiKorisnika(req,res)
)
MojRuter.route('/promeniSifru').post(
    (req,res)=>new MojKontroler().promeniSifru(req,res)
)
MojRuter.route('/sviPredmeti').post(
    (req,res)=>new MojKontroler().sviPredmeti(req,res)
)
export default MojRuter;