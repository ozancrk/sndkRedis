const wp = require("../wp/index.js")


module.exports = (router) => {
    router.get("/author/:slug", async (req, res) => {


        let a = {}

        await wp.tags().slug('ozan-cirik')

            .then(async function (catMeta) {



                catID = catMeta[0];
                return wp.posts().categories(catID.id).perPage(12).page(req.params.page).get();

            })
            .then(function (data) {

                post = data;

            });

        res.json({
            ozan: 'ozan', a
        })

    })
}