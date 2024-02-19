import mongoose, { Schema, Document } from 'mongoose';

export interface IPredmet extends Document {
    name: string;
   
   
}

const StudentSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    
    
})
const predmeti = mongoose.model<IPredmet>('Predmet', StudentSchema,'predmet');

export default predmeti;
