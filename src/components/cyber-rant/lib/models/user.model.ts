import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  // Cyber Rant App
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
  onboarded: { type: Boolean, default: false },
  communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }],
  reactions: [
    {
      thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' },
      type: { type: String, enum: ['heartpulse', 'fire', 'thumbsDown'] },
    },
  ],
  likedThreads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
  // TaskneticMinder App
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
