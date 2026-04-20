import mongoose from "mongoose";



const HostelSchema = new mongoose.Schema({
    Owner_Name: {
        type: String,
        required: true
    },
    Owner_Email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Owner_Phone: {
        type: Number,
        required: true
    },
    Hostel_Name: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Hostel_Location_Link:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Hostel_Photos:[{
        type: String,
        required: true
    }],
    Room_Type:[{
        type: String,
        required: true
    }],
    Number_of_Rooms:{
        type: Number,
        required: true
    },
    Room_Description:{
        type: String,
        required: true
    },
  
    Room_Photos:[{
        type: String,
        required: true
    }],
    Rental_Rates:{
        type: Number,
        required: true
    },
    In_Time:{
        type: String,
        required: true
    },
    Out_Time:{
        type: String,
        required: true
    },
    Payment_Methods:{
        type: String,
        required: true
    },
    Deposit_requirements:{
        type: String,
        required: true
    },
    Payment_Policies:{
        type: String,
        required: true
    },
    Rules_and_Policies:{
        type: String,
        required: true
    },
    Amenities:{
        type: String,
        required: true
    },
    Date_of_Registration:{
        type: Date,
        default: Date.now()
    },
    Hostel_Status:{
        type: String,
        enum: ['Pending', 'Acepted', 'Rejected'],
    },
    city:{
        type: String,
        required: true
    },
    Document_Number:{
        type: String,
        required: true
    },
    Document_Photo:{
        type: String,
        required: true
    },
    Latitude:{
        type: String,
        required: true
    },
    Longitude:{
        type: String,
        required: true
    },
    Hostel_For:{
        type: String,
        required: true
    }
});

const Hostel = mongoose.model('HostelSchema', HostelSchema);

export default Hostel;
    