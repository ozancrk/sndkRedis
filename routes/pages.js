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
                'excerpt': data.excerpt.rendered,
                'time': data.modified,
                'media': data.mediaURL
            }

            await client.json.set(KEY, '$', value[0])
            await client.expire(KEY, process.env.CACHETTL)
            res.json({
                page: url, postData: value[0],
            })
        } else {
            res.json({
                page: url, postData: value,
            })
        }
    })
}