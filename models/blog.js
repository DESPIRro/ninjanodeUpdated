const mongoose = require('mongoose'); 
//capital s
const blogSchema = mongoose.Schema({
    title: {
        type: String, 
        required:true
    }, 
    snippet: {
        type: String, 
        required: true
    }, 
    body: {
        type: String, 
        required: true
    }
});

//model names are normally given a capital letter
//first letter in function is pluralised has an 's' added to it, when searched in database
//second is the schema the model is based upon
module.exports = mongoose.model('blog', blogSchema  );
