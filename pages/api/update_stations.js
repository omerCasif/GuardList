import { connectDB } from './mongo';
import Station from '@/models/Station';

export default async function handle(req, res) {
    const { username, stations } = req.body;
    try {
        await Station.updateOne({ username: username }, { $set: { stations: stations } });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error updating stations:', error);
        res.status(500).json({ error: 'Error updating stations' });
    }
}
