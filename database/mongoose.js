const mongoose=require('mongoose');

mongoose.Promise= global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/taskmanagerdb')
    .then(() =>{
        console.log("DP Connected Sucessfully!")
    })
    .catch((error) =>{
        console.log("Error occurred while DB connection",error)
    });

module.exports = mongoose;