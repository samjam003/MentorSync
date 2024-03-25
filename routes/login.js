const express = require('express');
const router = express.Router();


router.get('/mentorLogin',(req,res)=>{
    res.render("login/mentorLogin",{header:true})
})
    
router.get('/adminlogin',(req,res)=>{
        res.render("login/adminLogin",{header:true})

})

module.exports = router