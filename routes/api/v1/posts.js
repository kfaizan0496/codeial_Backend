const express=require('express');
const router=express.Router();

const postAPI=require('../../../controllers/api/v1/post_api');

router.get('/',postAPI.index);
module.exports=router;