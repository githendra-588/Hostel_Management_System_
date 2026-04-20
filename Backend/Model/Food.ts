import mongoose from "mongoose";


const FoodSchema = new mongoose.Schema({
    Owner:{
        type: mongoose.Types.ObjectId,
        ref: 'Hostel',
    },
    Package_Name: {
        type: String,
        required: true
    },
    Package_Price: {
        type: String,
        required: true
    },
    Type_of_Meal: {
        type: String,
        required: true
    },
    Meal_Timings: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
    
});

const Food = mongoose.model('FoodSchema', FoodSchema);

export default Food;