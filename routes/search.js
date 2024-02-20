const wp = require("../wp/index.js")
const client = require("../redis/index.js")

module.exports = (router) => {
    router.get("/search/:query/:page?", async (req, res) => {

        //DEĞİŞKENLER

        let items;
        let status = 200;
        let error = false;

        if (req.params.limit) {
            req.params.limit = 12
        }


        await wp.posts()
            .search(req.params.query)
            .perPage(12)
            .page(req.params.page)
            .get().then(async function (postData) {


                if (postData.length < 1) {
                    // HATA KODLARI EKLENİYOR
                    status = 404;
                    error = true;
                    return;
                }


                // WORDPRESS'TEN VERİ ÇEKME BAŞARILI
                items = {
                    postData,
                }

                // BAŞARI KODU EKLENİYOR
                status = 200;
                error = false;
            }).catch(function (err) {

                // HATA KODLARI EKLENİYOR
                status = 404;
                error = err;
            });

        res.json({
            items, status, error
        })

    })
}