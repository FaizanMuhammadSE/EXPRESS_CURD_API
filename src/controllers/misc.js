import mongoose from 'mongoose';

export const connectDatabase = async (dbName) => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
    console.log('Connted successfully');
  } catch (error) {
    console.log('connectDatabase error: ', error);
  }
};
