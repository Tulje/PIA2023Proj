import mongoose, { Schema, Document } from 'mongoose';

export interface ITeacher extends Document {
    username: string;
    password: string;
    securityQuestion: string;
    securityAnswer: string;
    firstName: string;
    lastName: string;
    gender: string;
    address: string;
    contactPhone: string;
    email: string;
    profileImage: string; // Store the filename of the profile image
    // schoolType: string;
    // currentGrade: number;
    wantedSubjects:Array<String>;
    wantedClass:Array<String>;
    freeText:String;
    CV: string; // Store the filename of the profile image
    status:Number;

}

const TeacherSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    securityQuestion: { type: String, required: true },
    securityAnswer: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['M', 'F'], required: true },
    address: { type: String, required: true },
    contactPhone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String ,required:true}, // Store the filename of the profile image
    // schoolType: { type: String, required: true },
    // currentGrade: { type: Number, required: true }
    wantedSubjects:{type:Array ,required:true},
    wantedClass:{type:Array,required:true},
    freeText:{type:String,required:true},
    CV:{type:String,required:true},
    status:{type:Number,required:true}
});

const Teacher = mongoose.model<ITeacher>('teachers', TeacherSchema);

export default Teacher;
