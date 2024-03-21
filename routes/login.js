const express = require('express');
const router = express.Router();


router.get('/mentorLogin',(req,res)=>{
    res.render("login/mentorLogin")
})
    
router.get('/adminlogin',(req,res)=>{
        res.render("login/adminLogin")

})

module.exports = router