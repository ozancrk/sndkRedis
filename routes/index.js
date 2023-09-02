const PostsFn = require("./posts.js");
const HomeFn = require("./home.js");
const CategoryFn = require("./categories.js");
const LastpostsFn = require("./lastposts.js");
const PagesFn = require("./pages.js");

const RouterArrFn = [
    PostsFn,
    HomeFn,
    CategoryFn,
    LastpostsFn,
    PagesFn
]

module.exports = RouterArrFn;