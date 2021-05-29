const jwt = require('jsonwebtoken');
const JwtSecret = require('../constants/SecurityConstants').getJWTSecret()

const getJWT=async (data)=>{
    let p = new Promise((resolve,reject)=>{
        jwt.sign(data,JwtSecret,{expiresIn:20*60},(err,token)=>{
            if(err){
                reject(err.message)
            } else {
                resolve(token)
            }
        })
    })
    if(data){
        return await p.then(res=>{return {token:res,type:true}}).catch(err=>{return {err:err,type:false}})
    }else{
        return({type:false,err:'empty data'})
    }
}

const verifyJWT=async (token)=>{
    let p = new Promise((resolve,reject)=>{
        jwt.verify(token,JwtSecret,(err,data)=>{
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
    if(token){
        return await p.then(res=>{return {data:res,type:true}}).catch(err=>{return {err:err,type:false}})
    } else {
        return {type:false,err:'No token'}
    }
}

module.exports.getJWT = getJWT
module.exports.verifyJWT = verifyJWT