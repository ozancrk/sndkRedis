const wp = require("../wp/index.js")

module.exports = (router) => {
    router.get("/categorypage/:uid/:page?", async (req, res) => {
        if (req.params.page === undefined) {
            req.params.page = 1;
        }

        let status = 200;
        let error = false;

        let items;
        let posts = await wp.posts()
            .categories(req.params.uid)
            .perPage(10)
            .page(req.params.page)
            .get();

        if(posts.length < 1){
            // HATA KODLARI EKLENİYOR
            status = 404;
            error = true;
        }

        items = {
            posts
        }
        res.json({
            items, status, error
        })
    })
}