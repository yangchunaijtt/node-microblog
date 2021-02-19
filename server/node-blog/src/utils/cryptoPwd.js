const crypto  = require('crypto');

const PWD_KEY = 'QQWW123456_1613700110131sdsad..';

const crytoPwd = (pwd) => {
    const md5 = crypto.createHash('md5');
    const pwdStr = `pwd=${pwd}&key=${PWD_KEY}`;
    const  newpwd = md5.update(pwdStr).digest('hex');
    return newpwd;
}

module.exports = crytoPwd;