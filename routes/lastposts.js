const wp = require("../wp/index.js")
const client = require("../redis/index.js")

module.exports = (router) => {
    router.get("/lastposts", async (req, res) => {

        let redis = true;
        let items;
        const KEY = 'last:posts'

        items = await client.json.get(KEY)
        if (!items) {
            let posts = await wp.posts()
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