const wp = require("../wp/index.js")
const client = require("../redis/index.js")

module.exports = (router) => {
    router.get("/posts/:uid", async (req, res) => {

        //GELEN POST ID
        const POSTID = req.params.uid;

        //REDİS KEY
        const KEY = 'post:' + POSTID

        //DEĞİŞKENLER
        let status = '';
        let error = false;


        //REDİS'DE VERİ VAR MI DİYE KONTROL EDİLİYOR
        let value = await client.json.get(KEY)
        if (!value) {

            // REDİS'DE VERİ YOK. WORDPRESS'TEN ALINIYOR
            let val = {}
            await wp.posts().id(POSTID).get().then(async function (data) {

                // WORDPRESS'TEN VERİ ÇEKME BAŞARILI
                val = {
                    'title': data.title.rendered,
                    'content': data.content.rendered,
                    'excerpt': data.excerpt.rendered,
                    'time': data.date,
                    'media': data.mediaURL,
                    'mediaFull': data.mediaURLFULL,
                    'customMeta': data.customMeta,
                    'categories': data.categories
                }

                // POSTUN TARİHİ KONTROL EDİLİYOR
                let t = new Date(data.date.replace(' ', 'T') + 'Z').getTime() / 1000;
                if ((Date.now() / 1000) - t < 60480000 || val.cache) {
                    // POST 1 HAFTADAN YENİ İSE REDİS'E KAYDEDİLİYOR
                    await client.json.set(KEY, '$', val)
                    await client.expire(KEY, process.env.CACHETTL)
                }

                // BAŞARI KODU EKLENİYOR
                status = 200;
            }).catch(function () {

                // HATA KODLARI EKLENİYOR
                status = 404;
                error = true;
            });


            // RESPONSE
            res.json({
                postID: POSTID, postData: val, status, error
            })

        } else {


            // REDİS'TEN RESPONSE
            res.json({
                postID: POSTID, postData: value, error, status: 200
            })
        }
    })
}