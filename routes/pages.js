const wp = require("../wp/index.js")
const client = require("../redis/index.js")

module.exports = (router) => {
    router.get("/pages/:url", async (req, res) => {

        const url = req.params.url;

        const KEY = 'page:' + url
        let value = await client.json.get(KEY)

        if (!value) {
            let data = await wp.pages().slug(url).get();
            let val = {
                'title': data.title.rendered,
                'content': data.content.rendered,
            }
            let t = new Date(data.modified.replace(' ', 'T') + 'Z').getTime() / 1000;
            if ((Date.now() / 1000) - t < 60480000 || val.cache) {
                await client.json.set(KEY, '$', val)
                await client.expire(KEY, process.env.CACHETTL)
            }
            res.json({
                page: url, postData: val,
            })

        } else {
            res.json({
                page: url, postData: value,
            })
        }
    })
}