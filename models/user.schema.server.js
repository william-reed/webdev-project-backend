const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    phone: Number,
    carrier: String,
    isAdmin: {type: Boolean, default: false}
}, {collection: 'user'});

module.exports = userSchema;