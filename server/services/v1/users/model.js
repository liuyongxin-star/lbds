
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const idPlugin = require('mongoose-id');

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  endTime: String,
  status: {
    type: String,
    default: 10
  }
}, { autoCreate: true });

userSchema.plugin(mongoosePaginate);
userSchema.plugin(idPlugin);

const User = mongoose.model('luban_users', userSchema);

module.exports = User;
