const Post=require('../../../models/post');
const Comment=require('../../../models/comment');



module.exports.index=async function(req,res){
    try{

        const posts=await Post.find({})
        .sort('_createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
      

        //firstly
        // return res.json(200,{
        //     message:"List of Posts",
        //     posts:[],

            
        // })




        return res.json(200,{
            message:"List of Posts",
            posts:posts,

            
        })
    }catch(err){
        console.log(err);
    }
 
}

// how to delete posts using apis and delete request
// copy code from  destroy in post_controllers

module.exports.destroy= async function(req,res){
    try{
    
      let post=await Post.findById(req.params.id); 
     
    
       
        await post.deleteOne({_id:req.params.id})
     
          await Comment.deleteMany({post:req.params.id});
    
          return res.json(200,{
            message:"post associated comments are deleted",
          })

    }catch(err){
    
      console.log("error occured in finding a post",err)
      return res.json(500,{
        message:"Internal Server Error"
      }) ;
       
    }
    
    }