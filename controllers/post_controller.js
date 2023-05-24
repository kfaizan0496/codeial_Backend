const Post=require('../models/post');
const Comment =require('../models/comment');

module.exports.create=async function(req,res){
  try{
   let post =await Post.create({
        content:req.body.content,
        user:req.user._id,
    });
   // method to check is it ajax request or not and also submit the form manually..
    if(req.xhr){
      return res.status(200).json({
        data:{
          post:post,
        },
        message:"post Created!"
      })
    }

    req.flash('success','post published!');
    return res.redirect('back');
  }catch (err) {
    req.flash('error',err);

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


   // method to check is it ajax request or not and also submit the form manually..
  //AJAX

   if(req.xhr){
      return res.status(200).json({
        data:{
          post_id:req.params.id,
        },message:"post deleted"
      })
   }
      req.flash('success','post associated comments are deleted');

      return res.redirect('back')
 }else{
  req.flash('error','You cannot delete this post');

  return res.redirect('back')
 }
}catch(err){
  
  req.flash('error',err);

  console.log("error occured in finding a post",err)
  return ;
   
}

}