const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    variety:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    flavors: {
        type: String,
        trim: true,
        enum: ['Sweet', 'Semi-sweet', 'Acid', 'Semi-acid', 'Neutral', 'Unknown'],
    },
    season: {
        type: String,
        required: true,
        trim: true,
        enum: ['Spring', 'Spring-Summer', 'Summer', 'Summer-Autumn', 'Autumn', 'Autumn-Winter', 'Winter', 'Winter-Spring', 'All year', 'Almost all year'],
    }

},{timestamps:true});

const Fruit = mongoose.model('fruits', fruitSchema);

module.exports = Fruit;