const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
 

// tell passport to use a new  google Strategy for login 
passport.use(new googleStrategy({
    clientID:"944962193161-vepbtjllhobesbs40s2fja6c377q3jj0.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback",

},
 async function(accessToken,refreshToken,profile,done){
try{
    // find user
    const user= await User.findOne({email:profile.emails[0].value});
    if(!user){
        console.log("error in finding the user in google-Strategy");
        return;
    }
    console.log("Profile",profile)
    // if found set this user as req.user
    if(user){
        return done(null,user)
    }else{
    // if  not found create user and set it   as req.user
        
        const user=  await User.create({
        name:profile.displayName,
        email:profile.emails[0].value,
        password:crypto.randomBytes(20).toString('hex'),

       }) ;
       if(!user){
        console.log("error in finding the user in google-Strategy");
        return;
    }
    return done(null,user)
    }


}catch(err){
    console.log("eror in Google Stratgey ::-->",err)
}
}
))


module.exports=passport;