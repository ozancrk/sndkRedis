const wp = require("../wp/index.js")
const client = require("../redis/index.js")

module.exports = (router) => {
    router.get("/category/:uid/:limit?", async (req, res) => {

        //DEĞİŞKENLER
        let redis = true;
        let items;
        let status = 200;
        let error = false;


        //REDİS KEY
        const KEY = 'category:' + req.params.uid;

        items = await client.json.get(KEY)
        if (!items) {
            await wp.posts()
                .categories(req.params.uid)
                .perPage(req.params.limit)
                .get().then(async function (postData) {


                    if(postData.length < 1){
                        // HATA KODLARI EKLENİYOR
                        status = 404;
                        error = true;
                        return;
                    }

                    // WORDPRESS'TEN VERİ ÇEKME BAŞARILI
                    items = {
                        postData
                    }

                    await client.json.set(KEY, '$', items)
                    await client.expire(KEY, process.env.CategoryCACHETTL)
                    await client.expire(KEY, process.env.CACHETTL)

                    // BAŞARI KODU EKLENİYOR
                    status = 200;
                    error = false;
                    redis = false
                }).catch(function () {

                    // HATA KODLARI EKLENİYOR
                    status = 404;
                    error = true;
                });

        }


        res.json({
            items, redis, status, error
        })

    })
}