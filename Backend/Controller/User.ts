import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import Multer from "multer";
import fs from "fs";
import path from "path";
import User from "../Model/User";
import Hostel from "../Model/Hostel";
import Room from "../Model/Room";
import Food from "../Model/Food";
import Booking from "../Model/Booking";
import Feedback from "../Model/Feedback";
import mongoose from "mongoose";



const router = Router();

const storage = Multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: Function) {
        const dir = path.join(__dirname, '../uploads/Users/Profiles');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req: Request, file: Express.Multer.File, cb: Function) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = Multer({ storage: storage });

router.post('/register', upload.single('Profile'), async (req: any, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, Mobile, Date_of_Birth, Address, gender, Nationality, Room, Dietary_Requirements, Profession, Education,city } = req.body;
        const Profile = req.file.filename

        const ExicstingUser = await User.findOne({ email: email });
        if (ExicstingUser) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }

        const user = await  User.create({

            name,
            email,
            password,
            Mobile,
            Date_of_Birth,
            Address,
            Profile,
            gender, Nationality, Room, Dietary_Requirements, Profession, Education ,city
        });
        if (!user) {
            return res.status(400).json({ success: false, error: 'Error registering user' });
        }
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error registering user' });
    }
}
);


router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid login credentials' });
        } else if (user.password !== password) {
            return res.status(400).json({ success: false, error: 'Invalid login credentials' });
        } else {
            res.status(200).json({ success: true, message: 'Login successful', data: user });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error logging in' });
    }
}
);


router.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const users = await User.findById(id);
        if (!users) {
            return res.status(404).json({ success: false, error: 'User not found' });
        } else {
            res.status(200).json({
                success: true,
                data: users
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: 'Error fetching users' });
    }
}
);

router.put('/users/:id', upload.single('Profile'), async (req: any, res: Response) => {
    const { id } = req.params;
    try {
        const { name, email, password, Mobile, Date_of_Birth, Address, gender, Nationality, Room, Dietary_Requirements, Profession, Education } = req.body;
        const Profile = req.file.filename
        const user = await User.findByIdAndUpdate(id, {
            name,
            email,
            password,
            Mobile,
            Date_of_Birth,
            Address,
            Profile,
            gender, Nationality, Room, Dietary_Requirements, Profession, Education}, { new: true });
                
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }else{
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: user
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error updating user' });
    }
}
);


type HostelType = {
    city: string;
}

router.get('/hostels', async (req: Request, res: Response) => {
    const city = req.query.city as string | undefined; // Ensure city is treated as a string

    try {
        if (city) {
            // If city query parameter is provided, perform aggregation to match city case-insensitively
            const hostels = await Hostel.aggregate<HostelType>([
                {
                    $match: {
                        city: { $regex: new RegExp(city, 'i') }
                    }
                }
            ]);
            if (hostels.length === 0) {
                return res.status(404).json({ success: false, error: 'Hostels not found' });
            } else {
                res.status(200).json({
                    success: true,
                    data: hostels
                });
            }
        } else {
            // If no city query parameter provided, fetch all hostels
            const hostels = await Hostel.find();

            if (hostels.length === 0) {
                return res.status(404).json({ success: false, error: 'Hostels not found' });
            } else {
                res.status(200).json({
                    success: true,
                    data: hostels
                });
            }
        }
    } catch (error) {
        console.error('Error fetching hostels:', error);
        res.status(400).json({ success: false, error: 'Error fetching hostels' });
    }
});




router.get('/hostel/:id',async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const hostels = await Hostel.findById(id);
        const rooms = await Room.find({ Owner: id });
        const foods = await Food.find({ Owner: id });
        if (!hostels) {
            return res.status(404).json({ success: false, error: 'Hostel not found' });
        } else {
            res.status(200).json({
                success: true,
                data: hostels,
                rooms: rooms,
                foods: foods
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error fetching hostel' });
    }
}
);


router.get('/hostelsroom/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const Rooms = await Room.findById(id);
        if (!Rooms) {
            return res.status(404).json({ success: false, error: 'Hostel not found' });
        } else {
            res.status(200).json({
                success: true,
                data: Rooms
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error fetching hostel' });
    }
}
);


router.get('/hostelfood/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const Foods = await Food.findById(id);
        if (!Foods) {
            return res.status(404).json({ success: false, error: 'Hostel not found' });
        } else {
            res.status(200).json({
                success: true,
                data: Foods
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error fetching hostel' });
    }
}
);




// BOOK THE HOSTEL AND ROOM , FOOD
router.post('/bookhostel/:userid/:hostelid/:roomid/:foodid', async (req: Request, res: Response) => {
    const { userid, hostelid, roomid, foodid } = req.params;
    try {
        const user = await User.findById(userid);
        const hostel = await Hostel.findById(hostelid);
        const room = await Room.findById(roomid);
        const food = await Food.findById(foodid);



        const checkBooking = await Booking.findOne({ User: userid, Hostel: hostelid, Room: roomid });

        if (checkBooking) {
            return res.status(400).json({ success: false, error: 'Booking already exists' });
        }


        if (!user || !hostel || !room || !food) {
            return res.status(404).json({ success: false, error: 'User, Hostel, Room or Food not found' });
        } else {

            const {cardholder, cardNumber, cvv, expire} = req.body;

          const booking =  await Booking.create({
            User: user._id,
            Hostel: hostel._id,
            Room: room._id,
            Food: food._id,
            Payment:{
                cardholder,
                cardNumber,
                cvv,
                expire
            },
            Amount: req.body.Amount,
            Date_of_Joining: req.body.Date_of_Joining
          });
          if(booking){
              res.status(201).json({ success: true, message: 'Booking successful' });
          }else{
                res.status(400).json({ success: false, error: 'Error booking' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error booking' });
    }
}
);


// GET BOOKINGS BY USER ID
router.get('/bookings/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const bookings = await Booking.aggregate([
            {
                $match: { User: new mongoose.Types.ObjectId(id) }
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
                    $lookup: {
                        from: Hostel.collection.name,
                        localField: 'Hostel',
                        foreignField: '_id',
                        as: 'Hostel'
                    }
                },
                {
                    $lookup: {
                        from:Room.collection.name,
                        localField: 'Room',
                        foreignField: '_id',
                        as: 'Room'
                    }
                },
                {
                    $lookup: {
                        from: Food.collection.name,
                        localField: 'Food',
                        foreignField: '_id',
                        as: 'Food'
                    }
                }
                ]);

        const allBookings = await Booking.aggregate([
            {
                $match:{
                    User: new mongoose.Types.ObjectId(id)
                }
            }
        ]);

        if (!bookings) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        } else {
            res.status(200).json({
                success: true,
                data: bookings
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error fetching bookings' });
    }
}
);



// FEEEDBACK 
router.post('/feedback/:userid/:hostelid', async (req: Request, res: Response) => {
    const { userid } = req.params;
    const { hostelid } = req.params;
    try {
        console.log(hostelid);
        const user = await User.findById(userid);
        if(!user){
            return res.status(404).json({success:false,message:"No User Found With This Id"})
        }
        const {Message, Rating} = req.body;

        const feedback = await Feedback.create({
            User: user._id,
            Hostel: hostelid,
            Message:Message,
            Rating
        });

        if(feedback){
            res.status(201).json({ success: true, message: 'Feedback successful' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error booking' });
    }
}
);



router.get('/feedbacks/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const feedbacks = await Feedback.aggregate([
            {
                $match: { User: new mongoose.Types.ObjectId(id) }
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
                    $lookup: {
                        from: Hostel.collection.name,
                        localField: 'Hostel',
                        foreignField: '_id',
                        as: 'Hostel'
                    }
                },
                {
                    $unwind: '$Hostel'
                }
                ]);


        const allFeedbacks = await Feedback.aggregate([
            {
                $match:{
                    User: new mongoose.Types.ObjectId(id)
                }
            }
        ]);
        console.log(allFeedbacks);
                console.log(feedbacks);
        if (!feedbacks) {
            return res.status(404).json({ success: false, error: 'Feedback not found' });
        } else {
            res.status(200).json({
                success: true,
                data: feedbacks
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error fetching feedbacks' });
    }
}
);
        




 export default router;