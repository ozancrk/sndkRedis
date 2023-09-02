const wp = require("../wp/index.js")
const client = require("../redis/index.js")

module.exports = (router) => {
    router.get("/category/:uid/:limit?", async (req, res) => {

        let redis = true;
        let items;
        const KEY = 'category:' + req.params.uid;

        items = await client.json.get(KEY)
        if (!items) {
            let posts = await wp.posts()
                .categories(req.params.uid)
                .perPage(req.params.limit)
                .get();
            items = {
                posts
            }
            await client.json.set(KEY, '$', items)
            await client.expire(KEY, process.env.CategoryCACHETTL)
            redis = false
        }


        res.json({
            items,
            redis
        })

    })
}