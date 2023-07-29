{
    console.log("hello i'm home page");
     let createPost=function(){
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost=newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($( '.delete-post-button',newPost))
                     // call the create comment class
                     new PostComments(data.data.post._id);

                     // CHANGE :: enable the functionality of the toggle like button on the new post
                     new ToggleLike($(' .toggle-like-button', newPost));
                },
                error:function(error){
                    console.log(error.responsiveText);
                }
            })
    
        })
       
     }

     // method to create a post in dom
     let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
       
        <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">x</a>
        </small>
       
        <p>${post.content} &nbsp &nbsp ${post.user.name} </p>
        <br>
        <small>
        <small>
                            
        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
            0 Likes
        </a>
    
</small>
        <div class="post-comments">
          
             <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type Here to Add Comment..." required>
                <input type="hidden" name="post" value="${post._id}" >
                <input type="submit" value="Add Comment">
             </form>
    
    
    
               
    
    
                <div class="post-comment-list">
                    <ul id="post-comments-${post._id}">
                       
                    </ul>
    
    
                </div>
        </div>
    </li>` )
     }
   

// method to delete a post from DoM
let deletePost=function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'), // this is how to get the value of href
            success:function(data){
                $(`#post-${data.data.post_id}`).remove();

            },
            error:function(error){
                console.log(error.responsiveText);

            }
        })
    })
}






   createPost();
    }

