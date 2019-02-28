const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name:String,                         //or can be written as name = Schema.Types.String,
    alias:String,
    tags:[String],
    description:String,
    githubUrl:String,
    imageUrl:String,
    relatedProjects:[{name: String, link :String}]
});

//Returns complete project Collection
module.exports = mongoose.model('projects',projectSchema)