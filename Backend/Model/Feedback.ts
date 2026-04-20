import mongoose from "mongoose";


const FeedbackSchema = new mongoose.Schema({
    User: {
        type: mongoose.Types.ObjectId,
        ref:'User',
    },
    Hostel: {
        type: mongoose.Types.ObjectId,
        ref : 'Hostel',
    },
    Message: {
        type: String,
        required: true
    },
    Rating:{
        type: Number,
        required: true
    },
    Date:{
        type: Date,
        default: Date.now()
    }
});

const Feedback = mongoose.model('FeedbackSchema', FeedbackSchema);

export default Feedback;