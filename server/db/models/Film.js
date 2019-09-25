const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const filmSchema = new mongoose.Schema({
    _id: ObjectId,
    title:String,
    year:String,
    format:String,
    stars:Array,
    myId:String

}, {
    versionKey: false // You should be aware of the outcome after set to false
})

module.exports = Film = mongoose.model('films', filmSchema);