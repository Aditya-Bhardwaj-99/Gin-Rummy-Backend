class classSecurityConstants{
    constructor(){
        this._BYCRYPT_SALT = 10
        this._JWT_SECRET = 'e44edbc44bc6485ea6f21c0d29b14c7781a558c85cddb2b7620e98626637e1061b4a132b841e5f885015fea931fb1034cc0a03780022978b5a18154cc33a5b84'
        this._MONGO_PASS = 'wzXEvwi2wSLI9uj8'
        this._UUID_NAMESPACE = '66ecbc3c-7102-4ce7-b194-4c62664aaf46'
        this._MAIL_USER = 'gin.rummy2021@zohomail.in'
        this._MAIL_PASS = 'lpacafcs'
    }

    getJWTSecret=()=>{
        return(this._JWT_SECRET)
    }

    getBycryptSalt=()=>{
        return(this._BYCRYPT_SALT)
    }

    getMongoPass=()=>{
        return(this._MONGO_PASS)
    }

    getUuidNamespace=()=>{
        return(this._UUID_NAMESPACE)
    }

    getMailUser=()=>{
        return(this._MAIL_USER)
    }

    getMailPass=()=>{
        return(this._MAIL_PASS)
    }
}

const SecurityConstants = new classSecurityConstants

module.exports = SecurityConstants