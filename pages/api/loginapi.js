
const bcrypt = require('bcrypt');
const User = require('../../models/User');
import Cookies from 'cookies'
const jwt = require('jsonwebtoken');
import { connectDB, disconnectDB } from './mongo';


export default async function handle(req, res) {
        const { action, username, password } = req.body

        await connectDB();

        try {
                const mongoUser = await User.findOne({ username: username})
                if (!mongoUser) { // Incorrect username
                        return res.status(404).json({ message: 'Username not found' });
                }
                const isPasswordMatch = await bcrypt.compare(password, mongoUser.password)
                if (!isPasswordMatch) { // Incorrect password                      
                        return res.status(401).json({ message: 'Incorrect password' });
                }
                const envSecret = 'secret';
                const token = jwt.sign(
                        {
                                username: username,
                        },
                        envSecret,
                );
                const cookies = new Cookies(req, res)
                cookies.set('token', token, { httpOnly: false, sameSite: 'lax', path: '/' });
                res.status(200).json({ token });

        } catch (error) {
                console.error('Error during login:', error);
                res.status(500).json({ message: 'Internal Server Error' });
        }
}
