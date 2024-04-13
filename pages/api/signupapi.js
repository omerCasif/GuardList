const User = require('../../models/User');
const Name = require('../../models/Name');
const Station = require('../../models/Station');
const bcrypt = require('bcrypt');
import { connectDB, disconnectDB } from './mongo';

const saltRounds = 10;

export default async function handle(req, res) {    

    const { action, username, password, email } = req.body
    
    await connectDB();
    
    try {
        const mongoUser = await User.findOne({ username: username })
        if (mongoUser) { // username exists
            return res.status(404).json({ message: 'Username not unique' });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const emptyArray = []
        const newUser = new User({
            username: username,
            password: hashedPassword,
            email: email
        })
        const newName = new Name({
            username: username,
            names:emptyArray,
        })        
        const newStation = new Station({
            username: username,
            stations:emptyArray,
        })
        const userSave = await newUser.save()
        const nameSave = await newName.save()
        const stationSave = await newStation.save()
        if (userSave && nameSave && stationSave) {
            console.log(`user has been saved!`)
            res.status(201).json(newUser)
        }
        else {
            console.log("user save error")
            res.status(400).json({ message: "error when saving user" })
        }
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }    
}