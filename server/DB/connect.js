const mongoose = require('mongoose');
const DB = process.env.DB;

mongoose.connect('mongodb+srv://ahmed:123@cluster0.pur7f84.mongodb.net/DB')
.then(()=>{
    console.log(`Database Connected Successfully!`);
}) 
.catch((err)=>{
    console.log(`faizan an error occured .The Error is :${err}`);
})