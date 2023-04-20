const express=require('express');
const app=express();
const port=8000;

//setting up the layouts

const expressLayouts=require('express-ejs-layouts');

app.use(express.static('./assets'));


app.use(expressLayouts);

// extract styles and scripts from subPages into the Layouts

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// setting up the view engine

app.set('view engine','ejs');
app.set('views','./views');


// use express router

app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`error running in express server ::${err}`);
    }
    console.log(`Server is running on port number:${port}`);
});