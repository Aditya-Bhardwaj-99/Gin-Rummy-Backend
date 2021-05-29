const moment = require('moment');
const Log = (time,type,msg) => {
    let t;
    switch(type){
        case 'err': t = ' [ERR] => ';
        break;
        case 'info': t = ' [INFO] => ';
        break;
        case 'req': t = ' [REQUEST] => ';
        break;
        case 'websock': t = ' [WEBSOCK] => ';
        break;
        case 'websosckerr': t = ' [WEBSOCK ERR] => ';
        break;
        default : t = ' [UNKNOWN] => ';
    }
    time = moment(time).local().format('DD:MM:YY hh:mm:ss');

    console.log(time+t+msg)
}

module.exports = Log