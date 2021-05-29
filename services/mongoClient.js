const MongoClient = require('mongodb').MongoClient;
const mongopass = require('../constants/SecurityConstants').getMongoPass();

const uri = `mongodb+srv://aladsss:${mongopass}@unogame.oxplv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const SearchCollection = async (collection, searchOptions = {}, callBack = undefined) => {
    const promise = new Promise((resolve, reject) => {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(err => {
            if (err) {
                reject(err.errmsg);
                client.close();
            } else {
                const doc = client.db("rummy").collection(collection);
                doc.find(searchOptions).toArray((err, result) => {
                    if (err) {
                        reject(err.errmsg);
                        client.close();
                    } else {
                        resolve(result)
                        client.close();
                    }
                })
            }
        })
    })

    let data = await promise.then((data) => { return { type: true, data: data } }).catch((err) => { return { type: false, data: err } });
    if (data.type) {
        if (callBack) {
            return { type: true, data: callBack(data.data) }
        } else {
            return data
        }
    } else {
        return data
    }
}

const InsertCollection = async (collection, insertDoc) => {
    return new Promise((resolve,reject)=>{
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(err => {
            if (err) {
                reject({type:false,data:err.errmsg});
                client.close();
            } else {
                const doc = client.db("rummy").collection(collection);
                doc.insertOne(insertDoc).then(
                    resolve({type:true})
                ).catch((err)=>{
                    reject({type:false,data:err});
                    client.close();
                })
            }
        })
    })
}

const DeleteCollection = async (collection, deleteDoc) => {
    return new Promise((resolve,reject)=>{
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(err => {
            if (err) {
                reject({type:false,data:err.errmsg});
                client.close();
            } else {
                const doc = client.db("rummy").collection(collection);
                doc.deleteOne(deleteDoc).then(
                    resolve({type:true})
                ).catch((err)=>{
                    reject({type:false,data:err});
                    client.close();
                })
            }
        })
    })
}

const UpdateCollection = async (collection, updateDoc,where) => {
    return new Promise((resolve,reject)=>{
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(err => {
            if (err) {
                reject({type:false,data:err.errmsg});
                client.close();
            } else {
                const doc = client.db("rummy").collection(collection);
                doc.updateOne(where,{$set:updateDoc}).then(
                    resolve({type:true})
                ).catch((err)=>{
                    reject({type:false,data:err});
                    client.close();
                })
            }
        })
    })
}

module.exports.SearchCollection = SearchCollection
module.exports.InsertCollection = InsertCollection
module.exports.DeleteCollection = DeleteCollection
module.exports.UpdateCollection = UpdateCollection