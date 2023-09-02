const wp = require("../wp/index.js")
const client = require("../redis/index.js")

module.exports = (router) => {
    router.get("/pages/:url", async (req, res) => {

        const url = req.params.url;
        const KEY = 'page:' + url
        let value = await client.json.get(KEY)

        if (!value) {
            let value = await wp.pages().slug(url).get();
            await client.json.set(KEY, '$', data)
            await client.expire(KEY, process.env.CACHETTL)
            res.json({
                page: url, postData: value,
            })
        } else {
            res.json({
                page: url, postData: value,
            })
        }
    })
}