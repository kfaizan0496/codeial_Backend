const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWt=require('passport-jwt').ExtractJwt;
const env =require('./enviroment')


const User=require('../models/user');

let opts={
 jwtFromRequest:ExtractJWt.fromAuthHeaderAsBearerToken(),
//    secretOrKey :'codeial',
 //CHANGE::for production
secretOrKey :env.passport_jwt_secret_key,


}

   passport.use(new JWTStrategy(opts, async function(jwt_payload, done) {

    const user=await User.findById(jwt_payload._id)
    if(!user){
       
        console.log('Erron in Finding user---->JWT');
        return ;
    }
    if(user){
       
        return done(null,user)
         
    }else{
       
        return done(null,false)
         

    }



   }))

   module.exports=passport;