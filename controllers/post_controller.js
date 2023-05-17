const Post=require('../models/post');
const Comment =require('../models/comment');

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



module.exports.destroy= async function(req,res){
try{

  let post=await Post.findById(req.params.id); 
  console.log("posts",post);
  // note:--> .id means it is automatically converted objectId to  String 
 if(post.user==req.user.id){
  console.log("AAAAAAa");
  
    //  post.remove();
    await post.deleteOne({_id:req.params.id})
  console.log("BBBBB");

      //  const deletesComments=await Comment.deleteMany({post:req.params.id});
      Comment.deleteMany({post:req.params.id});
      return res.redirect('back')
  
     
 }else{
  return res.redirect('back')

 }
}catch(err){
  console.log("error occured in finding a post",err)
  return res.redirect('back')
   
}

}