import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';     
import users from './Controller/User';
import hostels from './Controller/Hostel';
import admin from './Controller/Admin';
import path from 'path';



const app = express();
const PORT = 4000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname,'uploads')));

const url = 'mongodb://localhost:27017/hotel';

const server = () => {
    try{
        mongoose.connect(url).then(() => {
            console.log('Connected to the database')
            app.listen(PORT, () => {
                console.log(`Server is running on PORT ${PORT}`);
            });
            }).catch((err) => {
                console.log('Error connecting to the database: ', err)  ;
            });
    }catch(err){
        console.log(err);
    }
}


server();


app.use('/users', users);
app.use('/hostels', hostels);
app.use('/admin',admin);