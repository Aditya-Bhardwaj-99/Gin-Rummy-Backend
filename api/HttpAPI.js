const router = require('express').Router();

router.post('/login',(req,res)=>{
    let user = req.body.email;
    let pass = req.body.password;

    //function to login

    res.send(JSON.stringify({userid:'',auth:'',token:''}))
    res.end()
})

router.post('/sigin',(req,res)=>{
    let user = req.body.username
    let email = req.body.email
    let name = req.body.name
    let mobile = req.body.mobile
    let password = req.body.password

    //function to signin

    res.send(JSON.stringify({userid:'',auth:'',token:''}))
    res.end()
})

router.post('/logout',(req,res)=>{
    //function to logout and exp token
    res.send(JSON.stringify({ack:''}))
    res.end()
})

module.exports = router