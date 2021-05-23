const GameObjects = require('../constants/GameObjects')

const wsreducer = (dataObject,ws=undefined) => {
    dataObject=JSON.parse(dataObject);
    switch(dataObject.type){
        case 'GREETINGS':
        break;
        default:
            console.log('Invalid Request');
    }
}

module.exports = wsreducer