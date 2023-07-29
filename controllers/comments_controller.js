const Comment=require('../models/comment');
const Post=require('../models/post');
const commentsMailer=require('../mailers/comment_mailer');
const commentEmailWorker=require('../workers/comment_email_worker');
const queue=require('../config/kue');
const Like=require('../models/like');





module.exports.create =  async function(req , res){
    try{
      let post = await Post.findById(req.body.post);
  
      if (post){
          let comment = await Comment.create({
              content: req.body.content,
              post: req.body.post,
              user: req.user._id
          });
  
          post.comments.push(comment);
          post.save();
          
          comment = await comment.populate('user', 'name email');
        //   commentsMailer.newComment(comment);
           let job= queue.create('emails',comment).save(function(err){
            if(err){
                console.log("Error in creating Queue",err);
            }
              console.log("job Enqueued :",job.id)
           })  
       
          if (req.xhr){
            

            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Comment published!');

        res.redirect('/');
    }
}catch(err){
    req.flash('error', err);
    return;
}

}


module.exports.destroy=async function(req,res){
    try{
    const commentToBeDeleted=await Comment.findById(req.params.id);
      if(commentToBeDeleted.user==req.user.id){ 
         let postId=commentToBeDeleted.post;
         await commentToBeDeleted.deleteOne({_id:req.params.id})
         Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
           //Change:: delete the associated likes for this comment
        Like.deleteMany({likeable:comment._id,onModel:'Comment'})
         return res.redirect('back');


}else{
    return res.redirect('back');


}


    }catch(err){
        console.log("Error Occured while deleting a comment :",err);
        return res.redirect('back');

    }
}