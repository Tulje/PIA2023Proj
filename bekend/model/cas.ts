import mongoose, { Schema, Document } from 'mongoose';
import { User } from './User';
import Teacher from './teacher';
import Student from './student';

export interface IAdmin extends Document {
    user:any,
    teacher:any,
    datetime:Date,
    end:Date,
    double:any,
    subject:string,
    opis:string,
    status:string,
   

   
}

const StudentSchema: Schema = new Schema({
    user: { },
    teacher: {  },
    datetime:Date,
    end:Date,
    double:{type:Boolean},
    subject:{type:String},
    opis:{type:String},
    status:{type:String},

    
})
const Casovi = mongoose.model<IAdmin>('Class', StudentSchema,'class');

export default Casovi;
