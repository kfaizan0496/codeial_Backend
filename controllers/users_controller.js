const User=require('../models/user');
const fs= require('fs');
const path=require('path');

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
               User.uploadedAvatar(req,res,function(err){
                    if(err){
                         console.log('***Multer Error:',err);

                    }
                    console.log(req.file);
                    user.name=req.body.name;
                    // user.email=req.body.email;
                    if(req.file){
                         if(user.avatar){
                              fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                         }

                         // this is the saving the path of the uploaded file into the 
                         // avatar field in the user...
                         user.avatar=User.avatarPath+'/'+req.file.filename;

                    }
                    user.save();

               })
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
module.exports.createSession=async function(req,res){
     try{
          req.flash('success','Logged In Successfully');
          //Todo Later
          return res.redirect('/');
     }catch(err){
          req.flash('error','invalid username/Password');

          return res.redirect('back');

     }
    
}



// logout

module.exports.destroySession=function(req,res){
     
     req.logout(function(err) {

          if (err) { return next(err); }
     req.flash('success','You have Logged Out');
     return res.redirect('back');
     })

    
}