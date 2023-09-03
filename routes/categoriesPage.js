const wp = require("../wp/index.js")


module.exports = (router) => {
    router.get("/categorypage/:slug/:page?", async (req, res) => {
        if (req.params.page === undefined) {
            req.params.page = 1;
        }

        let status = 200;
        let error = false;

        let items;
        let post;

        await wp.categories().slug(req.params.slug)

            .then(async function (catMeta) {

                let catID = catMeta[0];
                return wp.posts().categories(catID.id).perPage(12).page(req.params.page).get();

            })
            .then(function (data) {

                post = data;

            });

        console.log(post)

        if (post.length < 1) {
            // HATA KODLARI EKLENİYOR
            status = 404;
            error = true;
        }

        items = {
            post
        }
        res.json({
            items, status, error
        })
    })
}