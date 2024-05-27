import mongoose from 'mongoose';

export default mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  status: { type: String, required: true },
});
