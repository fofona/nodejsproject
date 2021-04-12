var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/Stackunderflow');
var QRSchema = mongoose.Schema({


    tags: String,
    category: String,
    texteQ: String,
    datetime: Date,
    Reponses: { texteR: String }

})

module.exports = mongoose.model('QRCollections', QRSchema)