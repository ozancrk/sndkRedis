const wp = require("../wp/index.js")

module.exports = (router) => {
    router.get("/lastposts", async (req, res) => {

        //DEĞİŞKENLER
        let items;
        let status = '';
        let error = false;
        let posts = {}


        await wp.posts()
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