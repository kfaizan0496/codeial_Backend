const dotenv = require('dotenv').config({path: './config.env'})
const express=require('express');
const logger=require('morgan');

const cookieParser=require('cookie-parser');

const app=express();
require('./config/view-helpers')(app);

const port=process.env.PORT ||8000;
// changing for production
const env=require('./config/enviroment');
app.use(express.urlencoded());
// used for session cookie and authentication
 const db=require('./config/mongoose');
 const session=require('express-session');
 const passport=require('passport');
 const passportLocal=require('./config/passport-local-strategy');
 const passportJWT=require('./config/passport-jwt-strategy');
 const passportGoogle=require('./config/passport-google-oauth2-strategy');
 const MongoStore=require('connect-mongodb-session')(session);
 const url=env.mongo_url;
var store=new MongoStore({
    // uri: 'mongodb://127.0.0.1/codeial_development',
    uri:url,
    collection:'mySessions',
    mongooseConnection:db,
    autoRemove:'disabled',
})

// sass middleware
// const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

app.use(logger(env.morgan.mode,env.morgan.options));
// if(env.name=='development'){
// app.use(sassMiddleware({
//     src:'./assets/scss',
//     dest:'./assets/css',
//     debug:true,
//     outputStyle:'expanded',
//     prefix:'/css',
// }))
// }


const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat Server is listening on port number 5000");

//setting up the layouts
const expressLayouts=require('express-ejs-layouts');
app.use(cookieParser());
// app.use(express.static('./assets'));
app.use(express.static(env.asset_path));


// make the uploads path available for the browser...
app.use('/uploads',express.static(__dirname+'/uploads'));


app.use(expressLayouts);

// extract styles and scripts from subPages into the Layouts

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// setting up the view engine

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    // secret:'blahsomething',
    secret:env.session_cookie_key,

    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100),
    },
     store: store
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router

app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`error running in express server ::${err}`);
    }
    console.log(`Server is running on port number:${port}`);
});