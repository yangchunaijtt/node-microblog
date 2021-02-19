const fs = require('fs');
const path = require('path');

const writeLog = (writeStream,log) => {
    writeStream.write(log+'\n');
};

const createWirteStream = (fileName) => {
    const fullName = path.join(__dirname,'../','../','logs',fileName)
    let writeStream = fs.createWriteStream(fullName, {
        flags: 'a',     // 在后面继续写入
    })    
    return writeStream;
}

const accessWriteLog = (log) => {
    const accessStream = createWirteStream('access.log');
    writeLog(accessStream,log);
}

module.exports = {
    accessWriteLog
};