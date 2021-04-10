var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/Stackunderflow');
var userSchema = mongoose.Schema({
    name: String,
    mail: String,
    password: String,
    confirmation: String


})
module.exports = mongoose.model('users', userSchema)