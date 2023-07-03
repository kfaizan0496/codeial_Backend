const queue=require('../config/kue');
const commentsMailer=require('../mailers/comment_mailer');
queue.process('emails',function(job,done){
    console.log("Email Worker processing a job",job.data);
    commentsMailer.newComment(job.data)
    done();
})
