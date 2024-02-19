import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
    username: string;
    password: string;
   
}

const StudentSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
})
const Admin = mongoose.model<IAdmin>('Admin', StudentSchema,'admin');

export default Admin;
