const wp = require("../wp/index.js")
const client = require("../redis/index.js")

module.exports = (router) => {
    router.get("/category/:uid/:limit?", async (req, res) => {

        let redis = true;
        let value;
        const KEY = 'category:' + req.params.uid;

        value = await client.json.get(KEY)
        if (!value) {
            let posts = await wp.posts()
                .categories(req.params.uid)
                .perPage(req.params.limit)
                .get();
            value = {
                posts
            }
            await client.json.set(KEY, '$', value)
            await client.expire(KEY, process.env.CategoryCACHETTL)
            redis = false
        }


        res.json({
            value,
            redis
        })

    })
}