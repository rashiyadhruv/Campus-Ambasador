const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noofregSchema = new Schema({
  
    iitbhu: {
        type: Number,
    },
    iiitvado: {
        type: Number,
     },
     iiitdiu: {
        type: Number,
     },
     nirma: {
        type: Number,
     },

})

module.exports= mongoose.model('ambassador' , noofregSchema);