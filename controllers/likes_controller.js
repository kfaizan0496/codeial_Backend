const Like=require('../models/like');
const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.toggleLike=async function(req,res){
    try{
      let likeable;
      let deleted=false;
      if(req.query.type=='Post'){
        likeable=await Post.findById(req.query.id).populate('likes');

      }else{
        likeable=await Comment.findById(req.query.id).populate('likes');
        
      }
      // check if a likes already exist
      let existingLike=await Like.findOne({
        likeable:req.query.id,
        onModel:req.query.type,
        user:req.user._id,
      })

      // if likes already exist then delete it
      if(existingLike){
        likeable.likes.pull(existingLike._id);
        likeable.save();
        existingLike.remove();
        deleted=true;
      }else{
        // else make a new like 
        let newlike=await Like.create({
            user:req.user._id,
            likeable:req.query.id,
            onModel:req.query.type
        })
        likeable.likes.push(newlike._id);
        return res.json(200,{
            message:"Request Successfull",
            deleted:deleted
        })
      }


    }catch(err){
        console.log(err)
        return res.json(500,{
            message:"Internal Server Error"
        })
    }
}