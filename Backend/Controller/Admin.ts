import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import Hostel from "../Model/Hostel";
import Feedback from "../Model/Feedback";
import User from "../Model/User";
import Room from "../Model/Room";


const router = Router();


router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (email === 'admin@gmail.com' && password === 'admin') {
            res.status(200).json({ success: true, message: 'Admin logged in successfully' });
        } else {
            res.status(400).json({ success: false, error: 'Invalid login credentials' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error logging in' });
    }
}
);


router.get('/hostels', async (req: Request, res: Response) => {
    try {
        const hostels = await Hostel.find();
        if (!hostels || hostels.length === 0) {
            return res.status(404).json({ success: false, error: 'Hostels not found' });
        }else{
            res.status(200).json({
                success: true,
                data: hostels
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error fetching hostels' });
    }
});


router.get('/hostels', async (req: Request, res: Response) => {
    try {
        const hostels = await Hostel.find({Hostel_Status:'Pending'});
        if (!hostels) {
            return res.status(404).json({ success: false, error: 'Hostels not found' });
        }else{
            res.status(200).json({
                success: true,
                data: hostels
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error fetching hostels' });
    }
}
);


router.put('/hostels/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const status = req.body.Hostel_Status;
        const hostels = await Hostel.findByIdAndUpdate(id, { Hostel_Status: status }, { new: true });
        if (!hostels) {
            return res.status(404).json({ success: false, error: 'Hostel not found' });
        }else{
            res.status(200).json({
                success: true,
                message: 'Hostel updated successfully',
                data: hostels
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error updating hostel' });
    }
}
);


// get the feedbacks
router.get('/feedbacks', async (req: Request, res: Response) => {
    try {
        const feedbacks = await Feedback.aggregate([
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
                }
                ]);
        if (!feedbacks) {
            return res.status(404).json({ success: false, error: 'Feedbacks not found' });
        }else{
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


// get the aLL USERS
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ success: false, error: 'Users not found' });
        }else{
            res.status(200).json({
                success: true,
                data: users
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: 'Error fetching users' });
    }
}
);

// get the all added room
router.get('/rooms', async (req: Request, res: Response) => {
    try {
        const rooms = await Room.aggregate([
            {
                $lookup: {
                    from: Hostel.collection.name,
                    localField: 'Owner',
                    foreignField: '_id',
                    as: 'Owner'
                }
                }
                ])  
                ;
        if (!rooms) {
            return res.status(404).json({ success: false, error: 'Rooms not found' });
        }else{
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




export default router;
