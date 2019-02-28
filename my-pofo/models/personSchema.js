const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name:String,
    email:String,
    mobile:Number,
description:String
});

module.exports = mongoose.model('person',personSchema)