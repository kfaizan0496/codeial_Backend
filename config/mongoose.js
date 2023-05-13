// const mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost/codeial_development');

// const db =mongoose.Connection;
// db.on('error',console.error.bind(console,"Error Connecting to MongoDB"));

// db.once('open',function(){
//     console.log("Connecting to ::MongoDB");
// })


// module.exports=db;

// above code is not working....



const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const mongoDB = "mongodb://127.0.0.1/codeial_development"; 
const db=main().catch(err => console.log(err));
async function main() {
  await   mongoose.connect(mongoDB);
  console.log(' db is connected');
}

module.exports=db;