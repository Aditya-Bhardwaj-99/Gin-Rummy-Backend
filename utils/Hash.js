const bcrypt = require('bcrypt');
const saltRounds = require('../constants/SecurityConstants').getBycryptSalt();

const CreateHash = async (password) => {
    let hash = await bcrypt.hash(password,saltRounds).then((hash)=>{return hash}).catch((err)=>{console.log(err)})
    return hash
}

const CompareHash = async (password,hash) => {
    let res = await bcrypt.compare(password,hash).then((result)=>{return result}).catch((err)=>{console.log(err)})
    return res
}

module.exports.CreateHash = CreateHash
module.exports.CompareHash = CompareHash