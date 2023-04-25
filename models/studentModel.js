import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    SchoolName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique:true
    },
    Mobile: {
        type: String,
        required: true,
        unique:true
    },
    Password: {
        type: String,
        required: true
    },
    PhotoOfTheStudents: {
        type: String,
        required: true
    }
})

export default mongoose.model("Student", studentSchema)