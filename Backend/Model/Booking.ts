import mongoose from "mongoose";


const BookingSchema = new mongoose.Schema({
    User:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    Room:{
        type: mongoose.Types.ObjectId,
        ref: 'Room',
    },
    Hostel:{
        type: mongoose.Types.ObjectId,
        ref: 'Hostel',
    },
    Food:{
        type: mongoose.Types.ObjectId,
        ref: 'Food',
    },
    Payment:{
        type:{
            cardholder: {
                type: String,
                required: true
            },
            cardNumber: {
                type: String,
                required: true
            },
            expire: {
                type: String,
                required: true
            },
            cvv: {
                type: String,
                required: true
            }
        }
    },
    Amount:{
        type: Number,
        required: true
    },
    Date_of_Joining:{
        type: Date,
        required: true
    },
    Date:{
        type: Date,
        default: Date.now()
    }
});

const Booking = mongoose.model('BookingSchema', BookingSchema);

export default Booking;