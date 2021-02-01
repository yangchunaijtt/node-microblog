const serverHandle = (req,rs) => {
    res.setHeader('Content-type','application/json')

    const resData = {
        name:"111",
        site:'csds',
        evn:process.env.NODE_EVN
    }
    res.end(
        JSON.stringify(resData)
    )
}