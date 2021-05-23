class classSecurityConstants{
    constructor(){
        this._BYCRYPT_SALT = 10
        this._JWT_SECRET = 'asdfghjkokjhrfgb'
    }

    getJWTSecret=()=>{
        return(this.JWT_SECRET)
    }

    getBycryptSalt=()=>{
        return(this.BYCRYPT_SALT)
    }
}

const SecurityConstants = new classSecurityConstants

module.exports = SecurityConstants