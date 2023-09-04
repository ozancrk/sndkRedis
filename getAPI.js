async function getData(url) {
    const res = await fetch(process.env.WPENDPOINT + "/api/wp/v2/" + url, {
        cache: "no-store"
    })
    return res.json()
}