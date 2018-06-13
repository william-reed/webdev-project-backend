var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    phone: Number,
    carrier: String,
    isAdmin: Boolean
}, {collection: 'user'});

module.exports = userSchema;