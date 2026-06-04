import mongoose from 'mongoose';

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.log('Database Connection Failed:', error.message);
  }
};

export default ConnectDB;
