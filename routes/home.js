const wp = require("../wp/index.js")
const client = require("../redis/index.js")

module.exports = (router) => {
    router.get("/home", async (req, res) => {
        const KEY = 'home:Page';
        let items = await client.json.get(KEY)

        if (!items) {
            await wp.posts().categories(70598).perPage(3).get().then((manset) => {
                items = {
                    manset
                }
            });

            await client.json.set(KEY, '$', items)
            await client.expire(KEY, process.env.HOMECACHETTL)
            res.json({
                items
            })
        } else {
            res.json({
                items
            })
        }
    })
}