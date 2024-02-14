import express, { json } from 'express'
import multer from 'multer'
import Student, { IStudent } from './model/student'
import { User } from './model/User';
import a from './server';
import bcrypt from 'bcrypt'
import Teacher, { ITeacher } from './model/teacher';

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
    login = (req:express.Request,res:express.Response)=>{
        let username=req.body.username
        let password = req.body.password
        Student.findOne({username:username,password:password}).then(
            (data)=> res.json(data)
        )
        .catch((err)=>{console.log(err)
        })
    }
    loginT = (req:express.Request,res:express.Response)=>{
        let username=req.body.username
        let password = req.body.password
        Student.findOne({username:username,password:password}).then(
            (data)=> res.json(data)
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