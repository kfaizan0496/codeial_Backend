const express=require('express');
const router=express.Router();


const editController=require('../controllers/edit_controller');

router.get('/edit',editController.edit);


module.exports=router;