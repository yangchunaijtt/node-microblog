// /api/blog/

const handBlogServer = (req,res) => {
    const result = {
        msg:"这是主页的数据"
    };
    res.end(JSON.stringify(result));
}

module.exports = handBlogServer;