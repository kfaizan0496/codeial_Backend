const Comment=require('../models/comment');
const Post=require('../models/post');


module.exports.create=async function(req,res){
    try{
         const post=await Post.findById(req.body.post);
            if(post){
                const comment=await Comment.create({
                 content:req.body.content,
                 post:req.body.post,
                 user:req.user._id,
        
                  })
                    if(comment){
                    post.comments.push(comment);
                    post.save();
                   return res.redirect('/');
            }

        }
    return res.redirect('/');
    }catch(err){
        console.log('Error in creating comments: ', err);
        return res.redirect('/');
    }
}


module.exports.destroy=async function(req,res){
    try{
    const commentToBeDeleted=await Comment.findById(req.params.id);
      if(commentToBeDeleted.user==req.user.id){ 
         let postId=commentToBeDeleted.post;
         await commentToBeDeleted.deleteOne({_id:req.params.id})
         Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
         return res.redirect('back');


}else{
    return res.redirect('back');


}


    }catch(err){
        console.log("Error Occured while deleting a comment :",err);
        return res.redirect('back');

    }
}