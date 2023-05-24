const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');


passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true,
},
 async function( req,email,password,done){
   const user=await User.findOne({email:email});
    if(!user){
        req.flash('error',eror)
        console.log('Erron in Finding user---->passport');
        return done(err);
    }
    if(!user || user.password !=password){
        req.flash('error','Invalid Username/password')

        console.log('Invalid username/password');
        return done(null,false)
         
    }
    return done(null,user)
    
}

))



// serializing the user to decide which key is to be kept in the cookie

passport.serializeUser(function(user,done){
    done(null,user.id);
});

// Deserializing the user from the key in the cookie 

passport.deserializeUser( async function(id,done){
     const user=await User.findById(id);
        if(!user){
            console.log('Erron in Finding user---->passport');
            return done(err);
        }
        return done(null,user);
   
});
 
// check the user is authenticated
passport.checkAuthentication=function(req,res,next){
// if the user is signed in then pass on the request to the next function(controller's action)
if(req.isAuthenticated()){
    return next();
}

// if the user is not signed in
return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser=function(req,res,next){
if(req.isAuthenticated()){

    // req.user contains the current signed in user from the session cookie and we are just
    // sending this to locals for views
    res.locals.user=req.user;
}
next();
}




module.exports=passport;