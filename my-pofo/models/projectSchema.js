const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name:String,
    alias:String,
    tags:[String],
    description:String
});

//Returns complete project Collection
module.exports = mongoose.model('projects',projectSchema)