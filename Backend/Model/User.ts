import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Mobile: {
        type: Number,
        required: true
    },
    Date_of_Birth: {
        type: Date,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Profile: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    Nationality: {
        type: String,
        required: true
    },
    Room:{
        type: String,
        required: true
    },
    Dietary_Requirements: {
        type: String,
        required: true
    },
    Profession: {
        type: String,
        required: true
    },
    Education: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    
    
});

const User = mongoose.model('UserSchema', UserSchema);

export default User;