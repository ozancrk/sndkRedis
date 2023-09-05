const client = require("../redis");
module.exports = (router) => {
    router.get("/deleteCache/:type/:uid", async (req, res) => {

        const POSTID = req.params.uid;
        const Type = req.params.type;

        //REDİS KEY
        const KEY = Type+':' + POSTID

        await client.expire(KEY, 1)

        res.json({
            KEY
        })
    })
}