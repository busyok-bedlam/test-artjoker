const { Schema } = require('mongoose');
const UsersSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    }
})
module.exports = UsersSchema;
