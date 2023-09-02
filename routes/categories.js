const wp = require("../wp/index.js")
const client = require("../redis/index.js")

module.exports = (router) => {
    router.get("/category/:uid/:limit?", async (req, res) => {

        let redis = true;
        let posts;
        const KEY = 'category:' + req.params.uid;

        posts = await client.json.get(KEY)
        if (!posts) {
            let posts = await wp.posts()
                .categories(req.params.uid)
                .perPage(req.params.limit)
                .get();
            await client.json.set(KEY, '$', posts)
            await client.expire(KEY, process.env.CategoryCACHETTL)
            redis = false
        }


        res.json({
            posts,
            redis
        })

    })
}