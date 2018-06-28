const { Schema } = require('mongoose');
const mongooseToCsv = require('mongoose-to-csv');
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
UsersSchema.plugin(mongooseToCsv, {
    headers: 'Firstname Lastname Username Age',
    constraints: {
        'Username': 'userName',
        'Firstname': 'firstName',
        'Lastname': 'lastName',
        'Age': 'age'
    }
});

module.exports = UsersSchema;
