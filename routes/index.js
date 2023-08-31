const PostsFn = require("./posts.js");
const HomeFn = require("./home.js");
const CategoryFn = require("./categories.js");

const RouterArrFn = [
    PostsFn,
    HomeFn,
    CategoryFn
]

module.exports = RouterArrFn;