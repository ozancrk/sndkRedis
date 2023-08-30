const wp = require("../wp/index.js")
const client = require("../redis/index.js")

module.exports = (router) => {
    router.get("/posts/:uid", async (req, res) => {

        const POSTID = req.params.uid;

        const KEY = 'post:' + POSTID
        let value = await client.json.get(KEY)

        if (!value) {
            await wp.posts().id(POSTID).get().then(async function (data) {
                let val = {
                    'title': data.title.rendered,
                    'content': data.content.rendered,
                    'excerpt': data.excerpt.rendered,
                    'time': data.modified,
                    'media': data.mediaURL
                }
                let t = new Date(data.modified.replace(' ', 'T') + 'Z').getTime() / 1000;
                if ((Date.now() / 1000) - t < 60480000 || val.cache) {
                    await client.json.set(KEY, '$', val)
                    await client.expire(KEY, 100)
                }
                res.json({
                    postID: POSTID, postData: val,
                })
            }).catch(err => {
                res.json({
                    postID: POSTID, error: err.message, status: err.data.status
                })
            })
        } else {
            res.json({
                postID: POSTID, postData: value,
            })
        }
    })
}