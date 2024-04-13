import mongoose from 'mongoose';
require('dotenv').config();

const connectDB = async () => {

  const mongo_user = process.env.MONGO_USERNAME;
  const mongo_pass = process.env.MONGO_PASSWORD;
  const mongo_host_port = process.env.MONGO_HOST_PORT;
  const mongo_db = process.env.MONGO_DB;

  console.log(mongo_user)
  console.log(mongo_pass)
  try {
    const uri = `mongodb+srv://${mongo_user}:${mongo_pass}@${mongo_host_port}/${mongo_db}`;
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
  }
};

export default async function handle(req, res) {

  await connectDB();

}

export { connectDB, disconnectDB };
