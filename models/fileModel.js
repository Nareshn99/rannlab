import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    File: {
        type: String,
        required: true
    }
})

export default mongoose.model("Files", fileSchema)