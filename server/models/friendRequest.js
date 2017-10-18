import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const friendRequestSchema = mongoose.Schema({
  initBy: {
    type: ObjectId,
    required: [true, 'The initiator of the friend request is required']
  },
  sentTo: {
    type: ObjectId,
    required: [true, 'The receiver of the friend request is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('FriendRequest', friendRequestSchema);
