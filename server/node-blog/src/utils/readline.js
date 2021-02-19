// 读取日志信息
const fs = require('fs');
const  path = require('path');
const readLine = require('readline');
const  process = require('process');

const fileName = path.join(__dirname,'../','../','logs','access.log');

const fullName = fs.createReadStream(fileName);

let chromeNum = 0;
let sunNum  = 0;

let rl = readLine.createInterface({
    input: fullName
})

rl.on('line',(line) => {
    if(!line){
        return 
    }
    console.log(line);
    const arrStr = line.split("--");
    if(arrStr[2] && arrStr[2].indexOf('Chrome') !== -1){
        chromeNum ++;
    }
    sunNum++;
})

rl.on('close',() => {
    console.log("已结束",chromeNum,sunNum,chromeNum/sunNum);
    process.exit(0); // 退出当前进程
})