const nodemailer=require('../config/nodemailer');

exports.newComment=(comment)=>{
   // render Html Template
    let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
    // console.log('inside newComment mailer', comment);

    
    nodemailer.transporter.sendMail({
        from:'kfaizan0496@gmail.com',
        to:comment.user.email,
        subject:'New Comment Published',
        // html:'<h1> Yup, Your New Comment is Now Published...</h1>'
        html:htmlString,
    },(err,info)=>{
        if(err){
            console.log('Error While New Comment ',err);
            return;
        }
        // console.log('SuccessFully Published',info);
          return;
    })
    return;
}