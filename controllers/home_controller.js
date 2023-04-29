module.exports.home=function(req,res){
// return res.end('<h1>Express is Up for codeial!!</h1>')
console.log(req.cookies);
res.cookie('user_id',34);
return res.render('home',{
    title:"home",

})

}

// module.exports.actionName=function(req,res){.......};