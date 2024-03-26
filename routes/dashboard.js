
const express = require('express');
const router = express.Router();



router.get('/',(req,res)=>{
    res.render("dashboard/index",{header:false})
})

//======================================Mentor Request===========================================

router.get('/mentor',(req,res)=>{
    res.render("dashboard/mentor/dashboard",{header:false,session : 'mentor'})
})

router.get('/new',(req,res)=>{
    res.render("dashboard/mentor/new",{header:false,session : 'mentor'})
})
router.get('/manage',(req,res)=>{
    res.render("dashboard/mentor/manage",{header:false,session : 'mentor'})
})
router.get('/index',(req,res)=>{
    res.send("go to the /authors in the link")
})

//======================================Admin Request===========================================
router.get('/admin',(req,res)=>{
    res.render("dashboard/admin/dashboard",{header:false,session : 'admin'})
})
router.get('/new',(req,res)=>{
    res.render("dashboard/admin/new",{header:false,session : 'admin'})
})
router.get('/manage',(req,res)=>{
    res.render("dashboard/admin/manage",{header:false,session : 'admin'})
})
router.get('/index',(req,res)=>{
    res.send("go to the /authors in the link")
})

//======================================Mentee Request===========================================
router.get('/mentee',(req,res)=>{
    res.render("dashboard/mentee/index",{header:false, session : 'mentee'})
})
router.get('/page2',(req,res)=>{
    res.render("dashboard/mentee/progress",{header:false, session : 'mentee'})
})
router.get('/page3',(req,res)=>{
    res.render("dashboard/mentee/security",{header:false, session : 'mentee'})
})
router.get('/page4',(req,res)=>{
    res.render("dashboard/mentee/notifications",{header:false, session: 'mentee'})
})



module.exports = router