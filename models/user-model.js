const UserSchema = require('../schemas/user-schema');
const mongoose = require('mongoose');

const UserModel = mongoose.model('Users',UserSchema);

module.exports = UserModel;