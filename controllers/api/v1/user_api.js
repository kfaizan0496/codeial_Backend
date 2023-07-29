const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
const env=require('../../../config/enviroment');

module.exports.createSession=async function(req,res){
try{
 let user=await User.findOne({email:req.body.email});
 if(!user || user.password!=req.body.password)
 {
  return res.json(422,{
    message:"Invalid Username/Password",
  })
 }
 return res.json(200,{
    message:"Sign In Successfull Here is Your Token Keep it Safe",
    data:{

        // token:jwt.sign(user.toJSON(),'codeial',{expiresIn:10000}),

       //CHANGE::for production

        token:jwt.sign(user.toJSON(),env.passport_jwt_secret_key,{expiresIn:10000}),

    }
 })


}catch(err)
{
    console.log("error occured in finding a post in user_api Controller",err)
    return res.json(500,{
      message:"Internal Server Error"
    }) ;
     
}

}