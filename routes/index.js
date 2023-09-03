const PostsFn = require("./posts.js");
const HomeFn = require("./home.js");
const CategoryFn = require("./categories.js");
const LastpostsFn = require("./lastposts.js");
const PagesFn = require("./pages.js");
const CategoriesPageFn = require("./categoriesPage.js");

const RouterArrFn = [
    PostsFn,
    HomeFn,
    CategoryFn,
    LastpostsFn,
    PagesFn,
    CategoriesPageFn
]

module.exports = RouterArrFn;