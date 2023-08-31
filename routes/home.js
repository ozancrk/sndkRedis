const wp = require("../wp/index.js")
const client = require("../redis/index.js")

module.exports = (router) => {
    router.get("/home", async (req, res) => {
        const KEY = 'home:Page';
        let value = await client.json.get(KEY)

        if (!value) {
            let manset = await wp.posts().categories(70598).perPage(6).get();
            let yazilar = await wp.posts().categories(6).perPage(4).get();

            let value = {
                manset,yazilar
            }
            await client.json.set(KEY, '$', value)
            await client.expire(KEY, process.env.HomeCACHETTL)
            res.json({
                value
            })
        } else {
            res.json({
                value,
            })
        }
    })
}