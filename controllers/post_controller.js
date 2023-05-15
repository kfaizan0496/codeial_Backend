const Post=require('../models/post');

module.exports.create=async function(req,res){
  try{
   const post=await Post.create({
        content:req.body.content,
        user:req.user._id,
    });

   
        if(!post){
            console.log("Error in Creating a post",err);return
        }
        return res.redirect('back');
  
  }catch (err) {
       console.log('Error in creating user: ', err);
       return res.redirect('/');
     }
}
