import mongoose, { Mongoose } from "mongoose";
import { Types } from "mongoose";


const RoomSchema = new mongoose.Schema({
    Owner:{
        type: mongoose.Types.ObjectId,
        ref: 'Hostel',
    },
    Room_Number: {
        type: String,
        required: true
    },
    Number_of_Beds: {
        type: Number,
        required: true
    },
    Type_of_Room: {
        type: String,
        required: true
    },
    Rent: {
        type: Number,
        required: true
    },
    Room_Photos: [{
        type: String,
        required: true
    }],
    facilties: {
        type: String,
        required: true
    },
    Payment:{
        type:{
            cardNumber: {
                type: Number,
                required: true
            },
            expiryDate: {
                type: String,
                required: true
            },
            cvv: {
                type: Number,
                required: true
            },
            cardHolderName: {
                type: String,
                required: true
            }
        }
    },
    Amount:{
        type: Number,
        required: true
    }
});


const Room = mongoose.model('RoomSchema', RoomSchema);

export default Room;