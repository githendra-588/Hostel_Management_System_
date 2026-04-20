import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import Multer from "multer";
import fs from "fs";
import path from "path";
import Hostel from "../Model/Hostel";
import Room from "../Model/Room";
import Food from "../Model/Food";
import Booking from "../Model/Booking";
import Feedback from "../Model/Feedback";
import mongoose from "mongoose";
import User from "../Model/User";








const router = Router();

const storage = Multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: Function) {
        const dir = path.join(__dirname, '../uploads/Hostel/Profiles');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req: Request, file: Express.Multer.File, cb: Function) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = Multer({ storage: storage }).fields([
   { name: 'Hostel_Photos', maxCount: 8 }, 
   { name: 'Room_Photos', maxCount: 15 },
   { name: 'Document_Photo', maxCount: 1 }
]);

router.post('/register', upload, async (req: any, res: Response, next: NextFunction) => {
    try {
        const { Owner_Name,Owner_Email,password,Owner_Phone,Hostel_Name,Address,Hostel_Location_Link,Description,Room_Type,Number_of_Rooms,Room_Description,Rental_Rates,In_Time,Out_Time,Payment_Methods,Deposit_requirements,Payment_Policies,Rules_and_Policies,Amenities,city,Latitude,Longitude,Document_Number,Hostel_For } = req.body;
        const hostelPhotos = req.files['Hostel_Photos'].map((file: Express.Multer.File) => file.filename);
        const roomPhotos = req.files['Room_Photos'].map((file: Express.Multer.File) => file.filename);
        const Document_Photo = req.files['Document_Photo'][0].filename;

        const ExicstingHostel = await Hostel.findOne({ Owner_Email: Owner_Email });
        if (ExicstingHostel) {
            return res.status(400).json({ success: false, error: 'Hostel already exists' });
        }

        const hostel =  Hostel.create({
            Owner_Name,
            Owner_Email,
            password,
            Owner_Phone,
            Hostel_Name,
            Address,
            Hostel_Location_Link,
            Description,
            Hostel_Photos: hostelPhotos,
            Room_Type,
            Number_of_Rooms,
            Room_Description,
            Room_Photos: roomPhotos,
            Rental_Rates,
            In_Time,
            Out_Time,
            Payment_Methods,
            Deposit_requirements,
            Payment_Policies,
            Rules_and_Policies,
            Amenities,
            Hostel_Status: 'Pending',
            city,
            Document_Photo,
            Document_Number,
            Latitude,
            Longitude,
            Hostel_For
        });

        if (!hostel) {
            return res.status(400).json({ success: false, error: 'Error registering hostel' });
        }
        res.status(201).json({ success: true, message: 'Hostel registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error registering hostel' });
    }
}
);


router.post('/login', async (req: Request, res: Response) => {
    try {
        const { Owner_Email, password } = req.body;
        const hostel = await Hostel.findOne({ Owner_Email: Owner_Email });
        if (!hostel) {
            return res.status(400).json({ success: false, error: 'Invalid login credentials' });
        } else if (hostel.password !== password) {
            return res.status(400).json({ success: false, error: 'Invalid login credentials' });
        } else if (hostel.Hostel_Status === 'Pending') {
            return res.status(400).json({ success: false, error: 'Hostel registration is pending approval' });
        }else if (hostel.Hostel_Status === 'Rejected') {
            return res.status(400).json({ success: false, error: 'Hostel registration has been rejected' });
        }
        else {
            res.status(200).json({ success: true, message: 'Login successful', data: hostel });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error logging in' });
    }
}
);



router.get('/hostels/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const hostels = await Hostel.findById(id);
        if (!hostels) {
            return res.status(404).json({ success: false, error: 'Hostel not found' });
        } else {
            res.status(200).json({
                success: true,
                data: hostels
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error fetching hostel' });
    }
}
);


router.put('/hostels/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const hostel = await Hostel.findByIdAndUpdate(id, req.body  , { new: true });
        if (!hostel) {
            return res.status(404).json({ success: false, error: 'Hostel not found' });
        } else {
            res.status(200).json({
                success: true,
                data: hostel
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error updating hostel' });
    }
}
);



//Add a new room to the hostel

const storageRoom = Multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: Function) {
        const dir = path.join(__dirname, '../uploads/Hostel/Rooms');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req: Request, file: Express.Multer.File, cb: Function) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadRoom = Multer({ storage: storageRoom }).array('Room_Photos');

router.post('/addroom/:id', uploadRoom, async (req: any, res: Response) => {
    const { id } = req.params;
    try {
        const hostel = await Hostel.findById(id);
        if (!hostel) {
            return res.status(404).json({ success: false, error: 'Hostel not found' });
        } else {
           const { Room_Number,Number_of_Beds,Type_of_Room,Rent,facilties,cardNumber,expiryDate,cvv,cardHolderName } = req.body;
          const Room_Photos = req.files.map((file: Express.Multer.File) => file.filename);
           const NewRoom = await Room.create({
                Owner: hostel._id,
                Room_Number,
                Number_of_Beds,
                Type_of_Room,
                Rent,
                Room_Photos,
                facilties,
                Payment:{
                    cardNumber,
                    expiryDate,
                    cvv,
                    cardHolderName
                },
                Amount: Number_of_Beds * 1000,                
              });

            if (!NewRoom) {
                return res.status(400).json({ success: false, error: 'Error adding room' });
            } else {
                res.status(200).json({
                    success: true,
                    data: NewRoom
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error adding room' });
    }
}
);


//get all rooms in a hostel id

router.get('/getroom/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rooms = await Room.find({ Owner: id });
        if (!rooms) {
            return res.status(404).json({ success: false, error: 'Rooms not found' });
        } else {
            res.status(200).json({
                success: true,
                data: rooms
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error fetching rooms' });
    }
}
);


router.put('/hostels/:Hostelid/:roomid',uploadRoom, async (req: any, res: Response) => {
    const { Hostelid } = req.params.Hostelid;
    const { roomid } = req.params.roomid;

    try {
        const hostel = await Hostel.findById(Hostelid);
        if (!hostel) {
            return res.status(404).json({ success: false, error: 'Hostel not found' });
        } else {
            const { Room_Number,Number_of_Beds,Type_of_Room,Rent,facilties } = req.body;
            const Room_Photos = req.file.filename;
            const NewRoom = await Room.findByIdAndUpdate(roomid, {
                Room_Number,
                Number_of_Beds,
                Type_of_Room,
                Rent,
                Room_Photos,
                facilties
            }, { new: true });

            if (!NewRoom) {
                return res.status(400).json({ success: false, error: 'Error updating room' });
            } else {
                res.status(200).json({
                    success: true,
                    data: NewRoom
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error updating room' });
    }
}
);


router.delete('/hostels/:Hostelid/:roomid', async (req: any, res: Response) => {
    const { Hostelid } = req.params.Hostelid;
    const { roomid } = req.params.roomid;

    try {
        const hostel = await Hostel.findById(Hostelid);
        if (!hostel) {
            return res.status(404).json({ success: false, error: 'Hostel not found' });
        } else {
            const room = await Room.findByIdAndDelete(roomid);
            if (!room) {
                return res.status(404).json({ success: false, error: 'Room not found' });
            } else {
                res.status(200).json({
                    success: true,
                    data: room
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error deleting room' });
    }
}
);



// Add Food Package
const storageFood = Multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: Function) {
        const dir = path.join(__dirname, '../uploads/Hostel/Food');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req: Request, file: Express.Multer.File, cb: Function) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadFood = Multer({ storage: storageFood }).array('Food_Photos', 5);

router.post('/food/:id', async (req: any, res: Response) => {
    const { id } = req.params;
    try {
        const hostel = await Hostel.findById(id);
        if (!hostel) {
            return res.status(404).json({ success: false, error: 'Hostel not found' });
        } else {
            const { Package_Name, Package_Price, Type_of_Meal, Meal_Timings, Description } = req.body;
            console.log(req.body);
            // const Food_Photos = req.files.map((file: Express.Multer.File) => file.filename);
            const NewFood = await Food.create({
                Owner: id,
                Package_Name,
                Package_Price,
                Type_of_Meal,
                Meal_Timings,
                Description
            });
            if (!NewFood) {
                return res.status(400).json({ success: false, error: 'Error adding food package' });
            } else {
                res.status(200).json({
                    success: true,
                    data: NewFood
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error adding food package' });
    }
}
);


router.get('/food/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const foods = await Food.find({ Owner: id });
        if (!foods) {
            return res.status(404).json({ success: false, error: 'Food packages not found' });
        } else {
            res.status(200).json({
                success: true,
                data: foods
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error fetching food packages' });
    }
}
);


router.put('/hostels/:Hostelid/:foodid', uploadFood, async (req: any, res: Response) => {
    const { Hostelid } = req.params.Hostelid;
    const { foodid } = req.params.foodid;

    try {
        const hostel = await Hostel.findById(Hostelid);
        if (!hostel) {
            return res.status(404).json({ success: false, error: 'Hostel not found' });
        } else {
            const { Package_Name, Package_Price, Type_of_Meal, Meal_Timings, Description } = req.body;
            const Food_Photos = req.files.map((file: Express.Multer.File) => file.filename);
            const NewFood = await Food.findByIdAndUpdate(foodid, {
                Package_Name,
                Package_Price,
                Type_of_Meal,
                Meal_Timings,
                Food_Photos,
                Description
            }, { new: true });

            if (!NewFood) {
                return res.status(400).json({ success: false, error: 'Error updating food package' });
            } else {
                res.status(200).json({
                    success: true,
                    data: NewFood
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error updating food package' });
    }
}
);


router.delete('/hostels/:Hostelid/:foodid', async (req: any, res: Response) => {
    const { Hostelid } = req.params.Hostelid;
    const { foodid } = req.params.foodid;

    try {
        const hostel = await Hostel.findById(Hostelid);
        if (!hostel) {
            return res.status(404).json({ success: false, error: 'Hostel not found' });
        } else {
            const food = await Food.findByIdAndDelete(foodid);
            if (!food) {
                return res.status(404).json({ success: false, error: 'Food package not found' });
            } else {
                res.status(200).json({
                    success: true,
                    data: food
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error deleting food package' });
    }
}
);


router.get('/bookings/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const hostel = await Hostel.findById(id);
        if (!hostel) {
            return res.status(404).json({ success: false, error: 'Hostel not found' });
        } else {
            const bookings = await Booking.aggregate([
                {
                    $match: { Hostel: new mongoose.Types.ObjectId(id) }
                    },
                    {
                        $lookup: {
                            from: User.collection.name,
                            localField: 'User',
                            foreignField: '_id',
                            as: 'User'
                        }
                    },
                    {
                        $unwind: '$User'
                    },
                    {
                        $project: {
                            'User.password': 0,
                            'User.Date': 0,
                            'User.__v': 0
                        }
                    },
                    {
                        $lookup: {
                            from: Hostel.collection.name,
                            localField: 'Hostel',
                            foreignField: '_id',
                            as: 'Hostel'
                        }
                    },
                    {
                        $unwind: '$Hostel'
                    },
                    {
                         $lookup: {
                            from: Room.collection.name,
                            localField: 'Room',
                            foreignField: '_id',
                            as: 'Room'
                    },
                    },
                    {
                        $unwind: '$Room'
                    },
                    {
                         $lookup: {
                            from: Food.collection.name,
                            localField: 'Food',
                            foreignField: '_id',
                            as: 'Food'

                    },
                    },
                    {
                        $unwind: '$Food'
                    },
                    {
                        $project: {
                            'Hostel.Owner': 0,
                            'Hostel.Owner_Phone': 0,
                            'Hostel.Owner_Email': 0,
                            'Hostel.password': 0,
                            'Hostel.Hostel_Status': 0,
                            'Hostel.Room_Type': 0,
                            'Hostel.Number_of_Rooms': 0,
                            'Hostel.Room_Description': 0,
                            'Hostel.Rental_Rates': 0,
                            'Hostel.In_Time': 0,
                            'Hostel.Out_Time': 0,
                            'Hostel.Payment_Methods': 0,
                            'Hostel.Deposit_requirements': 0,
                            'Hostel.Payment_Policies': 0,
                            'Hostel.Rules_and_Policies': 0,
                            'Hostel.Amenities': 0,
                            'Hostel.__v': 0,
                            'Hostel.Date': 0
                        }
                    }
                ]);
            if (!bookings) {
                return res.status(404).json({ success: false, error: 'Bookings not found' });
            } else {
                res.status(200).json({
                    success: true,
                    data: bookings
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error fetching bookings' });
    }
}
);

router.get('/bookings/:id/:bookingid', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { bookingid } = req.params;
    try {
        const hostel = await Hostel.findById(id);
        if (!hostel) {
            return res.status(404).json({ success: false, error: 'Hostel not found' });
        } else {
            const booking = await Booking.findById(bookingid);
            if (!booking) {
                return res.status(404).json({ success: false, error: 'Booking not found' });
            } else {
                res.status(200).json({
                    success: true,
                    data: booking
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error fetching booking' });
    }
}
);


// get the feedbacks
router.get('/feedbacks/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const hostel = await Hostel.findById(id);
        if (!hostel) {
            return res.status(404).json({ success: false, error: 'Hostel not found' });
        } else {
            


            const feedbacks = await Feedback.aggregate([
                {
                    $match: { Hostel: new mongoose.Types.ObjectId(id) }
                    },
                    {
                        $lookup: {
                            from: User.collection.name,
                            localField: 'User',
                            foreignField: '_id',
                            as: 'User'
                        }
                    },
                    {
                        $unwind: '$User'
                    },
                    {
                        $project: {
                            'User.password': 0,
                            'User.Date': 0,
                            'User.__v': 0
                        }
                    },
                    {
                        $lookup: {
                            from: Hostel.collection.name,
                            localField: 'Hostel',
                            foreignField: '_id',
                            as: 'Hostel'
                        }
                    },
                    {
                        $unwind: '$Hostel'
                    },
                    {
                        $project: {
                            'Hostel.Owner': 0,
                            'Hostel.Owner_Phone': 0,
                            'Hostel.Owner_Email': 0,
                            'Hostel.password': 0,
                            'Hostel.Hostel_Status': 0,
                            'Hostel.Room_Type': 0,
                            'Hostel.Number_of_Rooms': 0,
                            'Hostel.Room_Description': 0,
                            'Hostel.Rental_Rates': 0,
                            'Hostel.In_Time': 0,
                            'Hostel.Out_Time': 0,
                            'Hostel.Payment_Methods': 0,
                            'Hostel.Deposit_requirements': 0,
                            'Hostel.Payment_Policies': 0,
                            'Hostel.Rules_and_Policies': 0,
                            'Hostel.Amenities': 0,
                            'Hostel.__v': 0,
                            'Hostel.Date': 0
                        }
                    }
                ]);
            if (!feedbacks) {
                return res.status(404).json({ success: false, error: 'Feedbacks not found' });
            } else {
                res.status(200).json({
                    success: true,
                    data: feedbacks
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error fetching feedbacks' });
    }
}
);





export default router;