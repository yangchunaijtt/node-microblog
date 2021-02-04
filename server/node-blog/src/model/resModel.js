// 设置通用的返回信息
// 公用信息的基类
class resultModel {
    constructor(data, message) {
        message ? this.message = message : this.message = null;
        data ? this.data = data : this.data = null;
    }
}

// 成功
class successModel extends resultModel {
    constructor({ data, message }) {
        super(data, message);
        this.IsSuccess = true;
        this.errorno = 0;
    }
}

// 失败
class errorModel extends resultModel {
    constructor({ data, message }) {
        super(data, message);
        this.IsSuccess = false;
        this.errorno = 1;
    }
}


module.exports = {
    successModel,
    errorModel
};