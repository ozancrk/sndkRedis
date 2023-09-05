const wp = require("../wp/index.js")
const client = require("../redis/index.js")

module.exports = (router) => {
    router.get("/category/:uid/:limit?", async (req, res) => {

        //DEĞİŞKENLER
        let redis = true;
        let items;
        let status = 200;
        let error = false;

        if(req.params.limit){
            req.params.limit = 12
        }


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


                    let catMeta = await wp.categories().id(req.params.uid).get();



                    // WORDPRESS'TEN VERİ ÇEKME BAŞARILI
                    items = {
                        postData,
                        catMeta
                    }

                    await client.json.set(KEY, '$', items)
                    await client.expire(KEY, process.env.CATEGORYCACHETTL)

                    // BAŞARI KODU EKLENİYOR
                    status = 200;
                    error = false;
                    redis = false
                }).catch(function (err) {

                    // HATA KODLARI EKLENİYOR
                    status = 404;
                    error = err;
                });

        }


        res.json({
            items, redis, status, error
        })

    })
}