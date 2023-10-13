// const mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost/codeial_development');

// const db =mongoose.Connection;
// db.on('error',console.error.bind(console,"Error Connecting to MongoDB"));

// db.once('open',function(){
//     console.log("Connecting to ::MongoDB");
// })


// module.exports=db;

// above code is not working....

const env=require('./enviroment');

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
// const mongoDB = "mongodb://127.0.0.1/codeial_development"; 

  //CHANGE::for production
  console.log(env.mongo_url);
  const url=env.mongo_url;
  mongoose.connect(url,{
    serverSelectionTimeoutMS: 10000,
  });
const db = mongoose.connection;
  
// const mongoDB = `mongodb://127.0.0.1/${env.db}`; 

//  db=main().catch(err => console.log(err));
// async function main() {
//   await   mongoose.connect(mongoDB);
//   console.log(' db is connected');
// }

// module.exports=db;



// To Check Error 
db.on('error', console.error.bind(console, 'Error connecting to the db'));

db.once('open', function () {
  console.log("Successfully connected to the Database");
});

module.exports = db;