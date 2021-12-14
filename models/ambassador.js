const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ambassadorSchema = new Schema({
    
    name: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    }, 
    college: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    referals: {
        type: String,
    },
})

module.exports= mongoose.model('ambassador' , ambassadorSchema);