import { connectDB } from './mongo';
import Name from '@/models/Name';

export default async function handle(req, res) {
    const { username, names } = req.body;

    try {
        await Name.updateOne({ username: username }, { $set: { names: names } });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error updating names:', error);
        res.status(500).json({ error: 'Error updating names' });
    }
}
