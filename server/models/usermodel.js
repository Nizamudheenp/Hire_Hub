const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    role: {type:String,required:true,enum: ["user","company"],default:"user"},
})

module.exports = new mongoose.model("User",userSchema);