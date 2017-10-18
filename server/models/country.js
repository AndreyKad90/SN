import mongoose from 'mongoose';

let CountrySchema = mongoose.Schema({
  _id: {
    type: Number
  },
  code: {
    type: String
  },
  name: {
    type: String
  }
}, {versionKey: false, autoIndex: false });

export default mongoose.model('Country', CountrySchema);
