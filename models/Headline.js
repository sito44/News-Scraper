const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const headlineSchema = new Schema({
    
    date: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },
    
    author: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
});

const Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline;


 
