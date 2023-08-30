module.exports = (router) => {
    router.get("/posts/:uid", async (req,res) => {
        res.json({
            test: req.params.uid
        })
    })
}