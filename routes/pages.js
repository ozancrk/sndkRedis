const wp = require("../wp/index.js")

module.exports = (router) => {
    router.get("/pages/:url", async (req, res) => {

        //GELEN PAGE URL
        const url = req.params.url;

        //DEĞİŞKENLER
        let status = '';
        let val = {};
        let error = false;


        await wp.pages().slug(url).get().then(async function (data) {
            val = {
                'title': data[0].title.rendered, 'content': data[0].content.rendered,
            }
            // BAŞARI KODU EKLENİYOR
            status = 200;
        }).catch(function () {

            // HATA KODLARI EKLENİYOR
            status = 404;
            error = true;

        });


        res.json({
            page: url, postData: val, status, error
        })

    })
}