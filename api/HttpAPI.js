const router = require('express').Router();
const {v5:uuidv5} =require('uuid');
const uuidNamespace = require('../constants/SecurityConstants').getUuidNamespace()
const CreateHash = require('../utils/Hash').CreateHash
const CompareHash = require('../utils/Hash').CompareHash
const InsertCollection = require('../services/mongoClient').InsertCollection
const SearchCollection = require('../services/mongoClient').SearchCollection
const UpdateCollection = require('../services/mongoClient').UpdateCollection
const LogConst = require('../constants/LogConst');
const DocNames = require('../constants/DocumentsName')
const getJWT = require('../utils/jwt').getJWT
const verifyJWT = require('../utils/jwt').verifyJWT
const sendConfirmation = require('../services/Mailer').sendConfirmation
const fetchProfile = require('../Callbacks/fetchProfile').fetchProfile

router.post('/login',async (req,res)=>{

    let user = req.body.email;
    let pass = req.body.password;

    let data = await SearchCollection(DocNames.users,{user:user})
    
    if(data.type){
        if(data.data.length){
            let comp = await CompareHash(pass,data.data[0].password)
            if(comp){
                res.send(JSON.stringify({userid:data.data[0].userid,user:data.data[0].user,auth:true,mailConfirmed:data.data[0].mailConfirmed}))
            } else {
                res.send(JSON.stringify({auth:false,msg:'INCORRECT_PASS'}))
            }
        } else {
            res.send(JSON.stringify({auth:false,msg:'NO_USER'}))
        }
    } else {
        res.send(JSON.stringify({auth:false,msg:'ERR',err:data}))
    }
    res.end()
})

router.post('/signin',async (req,res)=>{
    let user = req.body.username
    let email = req.body.email
    let name = req.body.name
    let mobile = req.body.mobile
    let password = req.body.password
    let uuid = uuidv5(user,uuidNamespace)
    let hash = await CreateHash(password)

    let insertDoc = {
        user:user,
        email:email,
        name:name,
        mobile:mobile,
        userid:uuid,
        password:hash,
        mailConfirmed:false,
        wins:0,
        loss:0
    }
    let search = await SearchCollection(DocNames.users,{user:user}).then(data=>data).catch(data=>data)
    if(search.type==true){
        if(search.data.length){
            res.send(JSON.stringify({auth:false,err:'Username already exists'}))
        } else {
            let rep = await InsertCollection(DocNames.users,insertDoc).then(data=>data).catch(data=>data)
            if(rep.type==true){
                res.send(JSON.stringify({userid:uuid,auth:true,user:user}))
            } else {
                res.send(JSON.stringify({auth:false,err:rep.data}))
            }
        }
    } else {
        res.send(JSON.stringify({auth:false,err:search.data}))
    }
    res.end()
})

router.post('/sendcmail',async (req,res)=>{
    let userid = req.body.userid
    let data = await SearchCollection(DocNames.users,{userid:userid}).then(data=>data).catch(data=>data)
    if(data.type==true){
        let jwt=await getJWT({userid:userid}).then(data=>data).catch(data=>data)
        if(jwt.type){
            let rep = await sendConfirmation(data.data[0].email,jwt.token).then(data=>data).catch(data=>data)
            if(rep.type==true){
                res.send(JSON.stringify({auth:true,msg:rep.msg}))
            } else {
                res.send(JSON.stringify({auth:false,err:rep.err}))
            }
        } else {
            res.send(JSON.stringify({auth:false,err:jwt.err}))
        }
    } else {
        res.send(JSON.stringify({auth:false,err:data.err}))
    }
    res.end()
})

router.post('/confirmmail',async (req,res)=>{
    let token = req.body.token;
    let data = await verifyJWT(token).then(data=>data).catch(data=>data)
    if(data.type==false){
        res.send(JSON.stringify({auth:false,err:data.err}))
    } else {
        let rep=await UpdateCollection(DocNames.users,{mailConfirmed:true},{userid:data.data.userid}).then(data=>data).catch(data=>data)
        if(rep.type==true){
            res.send(JSON.stringify({auth:true}))
        } else {
            res.send(JSON.stringify({auth:false,err:rep.data}))
        }
    }
    res.end()
})

router.post('/profilefetch',async (req,res)=>{
    let userid = req.body.userid
    let rep = await SearchCollection(DocNames.users,{userid:userid},fetchProfile)
    if(rep.type){
        res.send(JSON.stringify({auth:true,data:rep.data}))
    } else {
        res.send(JSON.stringify({auth:false,err:rep.data}))
    }
    res.end()
})

module.exports = router