const fetchProfile = (data) => {
    data=data[0]
    return {user:data.user,email:data.email,mobile:data.mobile,name:data.name,wins:data.wins,loss:data.loss}
}

module.exports.fetchProfile = fetchProfile