const User=require('../models/user');

module.exports.profile=async function(req,res){
 try{
     const user=await User.findById(req.params.id);
     return  res.render('user_profile',{
          title:"profile",
          profile_user:user,
     });

 }catch(err){
     console.log('Error in rendering profile user: ', err);

 }
  
},


// updating the user info....
module.exports.update=async function(req,res){
     try{
          if(req.user.id==req.params.id){
               const user=await User.findByIdAndUpdate(req.params.id,req.body);
               if(user){
                    console.log("updating a user")
                 
               }
               return res.redirect('back');
     
          }else{
               console.log("Error in updating a user")
     
               res.status(401).send('unAuthorize')
          }
     }catch(err){
          console.log("Error in updating a user")
          return res.redirect('back');

     }
   
}



// render the Sign in Page...
module.exports.signIn=function(req,res){
     if(req.isAuthenticated()){
         return res.redirect('/users/profile');
     }
     return res.render('user_sign_in',{
          title:"Codeial | sign In"
     })
},

// render the Sign up Page...

module.exports.signUp=function(req,res){
     if(req.isAuthenticated()){
         return res.redirect('/users/profile');
     }
     return res.render('user_sign_up',{
          title:"Codeial | sign Up"
     })
  
}

// get the Signup data....
module.exports.create = async function(req, res) {
     try {
       if (req.body.password !== req.body.confirm_password) {
         return res.redirect('back');
       }
   
       const user = await User.findOne({ email: req.body.email });
   
       if (!user) {
         const newUser = await User.create(req.body);
         return res.redirect('/users/sign-in');
       } else {
         return res.redirect('back');
       }
     } catch (err) {
       console.log('Error in creating user: ', err);
       return res.redirect('back');
     }
   };







// sign in and create session for the session
module.exports.createSession=function(req,res){
     //Todo Later
     return res.redirect('/');
}



// logout

module.exports.destroySession=function(req,res){
     req.logout(function(err) {
          if (err) { return next(err); }
     })
         return res.redirect('/');
}