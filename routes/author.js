module.exports = (router) => {
    router.get("/author/:type/:uid/:page?", async (req, res) => {
        if (req.params.page === undefined) {
            req.params.page = 1;
        }

        const getData = async (url) => {
            const res = await fetch(process.env.WPENDPOINT+"/wp-json/wp/v2/"+url)
            return res.json()
        };

        let status = 200;
        let error = false;
        let items;
        let post = [];
       

        let url = 'posts/?'+req.params.type+'='+req.params.uid

        post = await getData(url)

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