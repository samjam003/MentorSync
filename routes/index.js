const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.render("index",{header:true})
})
    
router.get('/index',(req,res)=>{
    res.send("go to the /authors in the link")
})

module.exports = router