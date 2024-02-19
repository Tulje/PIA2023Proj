import express, { json } from 'express'
import multer from 'multer'
import Student, { IStudent } from './model/student'
import { User } from './model/User';
import a from './server';
import bcrypt from 'bcrypt'
import Teacher, { ITeacher } from './model/teacher';
import Admin from './model/admin';
import Casovi from './model/cas';
import predmeti from './model/predmeti';

//import storage from './src/server'
// import UserModel from './UserModel'
// import OrderModel from './OrderModel'
async function createUser(user: User): Promise<IStudent | null> {
    try {
        // Extract fields from the User object
        const {
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
            profileImage, // Assuming it's a Buffer
            schoolType,
            currentGrade
        } = user;

        // Create a new Student object
        const newStudent: IStudent = new Student({
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
        let kripto=await bcrypt.hash(newStudent.password,1)
        newStudent.password=kripto;
        // Save the Student object to the database
        const savedStudent: IStudent = await newStudent.save();

        return savedStudent;
    } catch (error) {
        console.error('Error creating student:', error);
        return null;
    }
}
async function createTeacher(data:any): Promise<ITeacher | null> {
    try {
        
        // Extract fields from the User object
        const {
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
            profileImage, // Assuming it's a Buffer
        } = data.user;
        let selectedSubjects=data.selectedSubjects
        let selectedYear=data.selectedYear
        let freeText=data.tekst
        let CV=data.file
        let status=0
        
        // Create a new Student object
        const newStudent: ITeacher = new Teacher({
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
        let kripto=await bcrypt.hash(newStudent.password,1)
        newStudent.password=kripto;
        // Save the Student object to the database
        selectedSubjects.forEach((element:any) => {
            newStudent.wantedSubjects.push(element)

        });
        selectedYear.forEach((element:any) => {
            newStudent.wantedClass.push(element)

        });
        const savedStudent: ITeacher = await newStudent.save();
        
        return savedStudent;
    } catch (error) {
        console.error('Error creating teacher:', error);
        return null;
    }
}
export class MojKontroler{
    login = async (req:express.Request,res:express.Response)=>{
        let username=req.body.username
        let password = await bcrypt.hash(req.body.password,1)
        console.log(password);
        
        Student.findOne({username:username}).then(
             async (data)=>{
                if(data){
                let flag=await bcrypt.compare(req.body.password,data.password)
                console.log(flag)
                if(flag){
                    console.log(data);
                    res.json(data)
                }
                else{
                    res.json(null)
                }

            }else{res.json(null)}}
        )
        .catch((err)=>{console.log(err)
        })
    }
    loginA = async (req:express.Request,res:express.Response)=>{
        let username=req.body.username
       
        let password = await bcrypt.hash(req.body.password,1)
        console.log(password);
        
        Admin.findOne({username:username}).then(
             async (data)=>{
                
                if(data){
               
               
                    console.log(data);
                    res.json(data)
                }
                else{
                    res.json(null)
                }

            }
        )
        .catch((err)=>{console.log(err)
        })
    }
    loginT = async (req:express.Request,res:express.Response)=>{
        let username=req.body.username
        

        Teacher.findOne({username:username}).then(
            
            async (data)=>{
                
                if(data){
                let flag=await bcrypt.compare(req.body.password,data.password)
                console.log(flag)
                if(flag){
                    console.log(data);
                    res.json(data)
                }
                else{
                    res.json(null)
                }

            }else{res.json(null)}}
        )
        .catch((err)=>{console.log(err)
        })
    }
    sviPredmeti = (req:express.Request,res:express.Response)=>{
        predmeti.find({}).then(data=>res.json(data))
    }
    teachers = (req:express.Request,res:express.Response)=>{
        Teacher.find({}).then(data=>res.json(data))
    }
    students = (req:express.Request,res:express.Response)=>{
        Student.find({}).then(data=>res.json(data))

    }
    pretragaTeachera = (req:express.Request,res:express.Response)=>{
        Teacher.find({}).then(data=>res.json(data))
    }
    updateStudent = (req:express.Request,res:express.Response)=>{
        let user=req.body.user
        Student.findOneAndUpdate({
            username:user.username
        },{$set:{
            
            
          
            firstName: user.firstName,
            lastName: user.lastName,
           
            address: user.address,
            contactPhone: user.contactPhone,
            email: user.email,
            profileImage: user.profileImage,
            schoolType: user.schoolType,
            currentGrade: user.currentGrade,
            
        }}).then(r=>{console.log(r);res.json(r)})
    }
    updateTeacher = (req:express.Request,res:express.Response)=>{
        let user=req.body.nastavnik
        Teacher.findOneAndUpdate({
            username:user.username
        },{$set:{
            
            
          
            firstName: user.firstName,
            lastName: user.lastName,
           
            address: user.address,
            contactPhone: user.contactPhone,
            email: user.email,
            profileImage: user.profileImage,
            wantedClass:user.wantedClass,
            wantedSubjects:user.wantedSubjects
            
        }}).then(r=>{console.log(r);res.json(r)})
    }
    PrihvatiNastavnika = (req:express.Request,res:express.Response)=>{
        let user=req.body.user
        Teacher.findOneAndUpdate({
            username:user.username
        },{$set:{
            
            
          
            status:1
            
        }}).then(r=>{console.log(r);res.json(r)})
    }
    sviCasovi =(req:express.Request,res:express.Response)=>{
        Casovi.find({}).then(data=>res.json(data))
    }
    prihvatiCas =(req:express.Request,res:express.Response)=>{
        Casovi.findOneAndUpdate({user:req.body.cas.user,teacher:req.body.cas.teacher,datetime:req.body.cas.datetime},{
            $set:{status:"Prihvacen"}
        }).then(data=>res.json(data))
    }
    odbijCas =(req:express.Request,res:express.Response)=>{
        Casovi.findOneAndDelete({user:req.body.cas.user}).then(data=>res.json(data))
    }
    OdbijNastavnika = (req:express.Request,res:express.Response)=>{
        let user=req.body.user
        Teacher.findOneAndUpdate({
            username:user.username
        },{$set:{
            
            
          
            status:-1
            
        }}).then(r=>{console.log(r);res.json(r)})
    }
    ZahtevajCas= (req:express.Request,res:express.Response)=>{
        console.log(req.body.IzabranPredmet)
        let pocetakRadnog=new Date(req.body.datetime)
        pocetakRadnog.setHours(11,0,0,0)
        let krajRadnog=new Date(req.body.datetime)
        krajRadnog.setHours(19,0,0,0)
        let datum= new Date(req.body.datetime)
        console.log(datum);
        
        let datumKraj= new Date(req.body.datetime)
        if(req.body.dupli){
        datumKraj.setHours(datum.getHours()+2)
    }
        else{
            datumKraj.setHours(datum.getHours()+1)

        }
        console.log(req.body.double)
        if(datum<pocetakRadnog || datum>krajRadnog){
            res.json({message:"Van radnog vremena"})
            return
        }
        let fleg=0
        Casovi.find({teacher:req.body.teacher}).then(data=>{
            data.forEach(el=>{
                if(datum>=el.datetime && datum<=el.end)
                    fleg=1
                else if(datumKraj>=el.datetime && datumKraj<=el.end)
                fleg=1
                
            })
            if(fleg==1){
                res.json({message:"Nastavnik ima cas za to vreme"})
            }
            else{
                let a=new Casovi()
                a.double=req.body.dupli
                a.user=req.body.user
                a.teacher=req.body.teacher
                a.datetime=req.body.datetime
                a.subject=req.body.IzabranPredmet
                a.end=datumKraj
                a.status="neodobren"
                a.save()
                res.json({message:"Uspesno zahtevan cas, ceka potvrdu"})
            }
        })
       
    }
    nadjiKorisnika = (req:express.Request,res:express.Response)=>{
        let username= req.body.username
        let password =req.body.password
        console.log(username,password);
        
        Student.findOne({username:username}).then(async (data:any)=>{
            console.log(data)
            if(data){
                
                let a=await bcrypt.compare(password,data.password)
                console.log("student"+a)
                if(a)
                res.json(data)
                else
                res.json(null)
            }
            else{
                Teacher.findOne({username:username}).then(async (data:any)=>{
                    console.log(data)
                    if(data){
                        let a=await bcrypt.compare(password,data.password)
                        if(a)
                        res.json(data)
                        else
                        res.json(null)
                    }
                    else{
                        res.json(null)
                    }
                })
            }
        })
    }
    promeniSifru= async (req:express.Request,res:express.Response)=>{
        let password= await bcrypt.hash(req.body.password,1)
        let username=req.body.username
        

        Teacher.findOne({username:username}).then(
            
            async (data)=>{
                
                if(data){
                let flag=await bcrypt.compare(req.body.passwordStara,data.password)
                console.log(flag)
                if(flag){
                    console.log(data);
                    Teacher.findOneAndUpdate({username:username},{
                        $set:{password:password}
                    }).then()
                    res.json({"message":"Uspeh"})
                }
                else{
                    res.json(null)
                }

            }
            else{
                Student.findOne({username:username}).then(
                    async (data)=>{
                       if(data){
                       let flag=await bcrypt.compare(req.body.passwordStara,data.password)
                       console.log(flag)
                       if(flag){
                        console.log(data);
                        Student.findOneAndUpdate({username:username},{
                            $set:{password:password}
                        }).then()
                        res.json({"message":"Uspeh"})
                       }
                       else{
                           res.json(null)
                       }
       
                   }else{res.json(null)}}
               )
               .catch((err)=>{console.log(err)
               })
            }}
        )
        .catch((err)=>{console.log(err)
        })

    }
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
   
        Register=(req:express.Request,res :express.Response)=>{
          createUser(req.body)
        }
        RegisterT=(req:express.Request,res :express.Response)=>{
            console.log(req.body)
            createTeacher(req.body)
        }
    }