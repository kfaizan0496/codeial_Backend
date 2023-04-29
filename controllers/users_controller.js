const User=require('../models/user');

module.exports.profile=function(req,res){
   return  res.render('user_profile',{
          title:"profile",
     });
},



// render the Sign in Page...
module.exports.signIn=function(req,res){
     return res.render('user_sign_in',{
          title:"Codeial | sign In"
     })
},

// render the Sign up Page...

module.exports.signUp=function(req,res){
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
}