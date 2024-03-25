
const express = require('express');
const router = express.Router();



router.get('/',(req,res)=>{
    res.render("dashboard/admin/dashboard",{header:false})
})
router.get('/new',(req,res)=>{
    res.render("dashboard/admin/new",{header:false})
})
router.get('/manage',(req,res)=>{
    res.render("dashboard/admin/manage",{header:false})
})
router.get('/index',(req,res)=>{
    res.send("go to the /authors in the link")
})

module.exports = router