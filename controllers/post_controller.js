const Post=require('../models/post');
const Comment =require('../models/comment');

module.exports.create=async function(req,res){
  try{
   await Post.create({
        content:req.body.content,
        user:req.user._id,
    });
    return res.redirect('back');
  }catch (err) {
       console.log('Error in creating user: ', err);
       return ;
     }
}



module.exports.destroy= async function(req,res){
try{

  let post=await Post.findById(req.params.id); 
  console.log("posts",post);
  // note:--> .id means it is automatically converted objectId to  String 
 if(post.user==req.user.id){

    //  post.remove();
    await post.deleteOne({_id:req.params.id})
  

      //  const deletesComments=await Comment.deleteMany({post:req.params.id});
      await Comment.deleteMany({post:req.params.id});
      return res.redirect('back')
 }else{
  return res.redirect('back')
 }
}catch(err){
  console.log("error occured in finding a post",err)
  return ;
   
}

}