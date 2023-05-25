module.exports.index=function(req,res){
    return res.json(200,{
        message:"List of Posts in V2",
        posts:[{
            data:"this is v2 form"
        }],
    })
}