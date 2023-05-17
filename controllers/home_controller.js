const  Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.home=  async function(req,res){
// return res.end('<h1>Express is Up for codeial!!</h1>')
// console.log(req.cookies);
// return res.render('home',{
//              title:"home",
// })
// res.cookie('user_id',34);

// try{
//     const posts=await Post.find({});
//     if(posts){
//         console.log('Post:',posts)
//        return res.render('home',{
//            title:"home",
//            posts:posts
       
//        })
     
//     }
//     return res.redirect('/');

// }catch(err){
//     console.log("Error in Fetching posts", err);
//     return res.redirect('/');

// }

// populate the user of each post...

try{
  
    const posts=await Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
    if(posts){
        // console.log('Post:',posts)
       return res.render('home',{
           title:"home",
           posts:posts,
     
        
       
       })
     
    }
    return res.redirect('/');

}catch(err){
    console.log("Error in Fetching posts", err);
    return res.redirect('/');

}

}



  
        

 


// module.exports.actionName=function(req,res){.......};