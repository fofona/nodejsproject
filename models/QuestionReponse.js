var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/Stackunderflow');
var QRSchema = mongoose.Schema({


    tags: String,
    category: String,
    texteQ: String,
    datetime: Date,
    //user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    Reponses: Array

})
module.exports = mongoose.model('QRCollections', QRSchema)