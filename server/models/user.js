import mongoose from 'mongoose';
import hash from '../utils/hash';
const ObjectId = mongoose.Schema.Types.ObjectId;

let UserSchema = mongoose.Schema({
  login: {
    type: String,
    required: [true, 'Login is required'],
    select: false //don't fetch the field by default
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false //don't fetch the field by default
  },
  details: {
    fullName: {
      type: String,
      required: [true, 'Full name is required']
    },
    gender: {
      type: Number,
      min: [0, 'Gender value must be from 0 to 2'],
      max: [2, 'Gender value must be from 0 to 2'],
      required: [true, 'Gender is required']
    },
    dob: {
      type: Date,
      min: new Date('1917-01-01'),
      max: new Date('2100-01-01')
    },
    status: {
      type: Number
    },
    address: {
      country: {
        type: String
      },
      city: {
        type: String
      }
    },
    aboutMe: {
      type: String
    },
    photoUrl: {
      type: String
    }
  },
  friends: {
    type: [ObjectId]
  },
  regDate: {
    type: Date,
    default: Date.now,
    select: false //don't fetch the field by default
  },
  lastLogin: {
    type: Date
  },
  blocked: {
    type: Boolean,
    default: false
  }
});


/* Instance methods */
UserSchema.methods.hashPassword = function() {
  return hash.generatePasswordHash(this.password).then(hashedPassword => {
    this.password = hashedPassword;
    return this;
  });
};

export default mongoose.model('User', UserSchema);
