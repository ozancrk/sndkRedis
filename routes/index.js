const PostsFn = require("./posts.js");
const HomeFn = require("./home.js");
const CategoryFn = require("./categories.js");
const LastpostsFn = require("./lastposts.js");

const RouterArrFn = [
    PostsFn,
    HomeFn,
    CategoryFn,
    LastpostsFn
]

module.exports = RouterArrFn;