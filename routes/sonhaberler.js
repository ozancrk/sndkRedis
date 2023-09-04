const wp = require("../wp/index.js")

module.exports = (router) => {
    router.get("/sonhaberler", async (req, res) => {

        //DEĞİŞKENLER
        let items;
        let status = '';
        let error = false;
        let posts = {}

        var date = new Date();

        date.setDate(date.getDate() - 1);

        await wp.posts()
            .perPage(48)
            .excludeCategories(10)
            .after(date.toISOString())
            .get().then(async function (data) {

                // WORDPRESS'TEN VERİ ÇEKME BAŞARILI
                posts = data

                // BAŞARI KODU EKLENİYOR
                status = 200;
            }).catch(function (err) {

                console.log(err)
                // HATA KODLARI EKLENİYOR
                status = 404;
                error = true;
            });

        items = {
            posts
        }

        res.json({
            items, error, status
        })

    })
}