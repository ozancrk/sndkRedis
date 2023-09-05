const PostsFn = require("./posts.js");
const HomeFn = require("./home.js");
const CategoryFn = require("./categories.js");
const LastpostsFn = require("./lastposts.js");
const PagesFn = require("./pages.js");
const AuthorFn = require("./author.js");
const SonhaberFN = require("./sonhaberler.js");
const delegeCacheFN = require("./deleteCache.js");

const RouterArrFn = [
    PostsFn,
    HomeFn,
    CategoryFn,
    LastpostsFn,
    PagesFn,
    AuthorFn,
    SonhaberFN,
    delegeCacheFN
]

module.exports = RouterArrFn;