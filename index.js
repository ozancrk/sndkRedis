require("express-async-errors");
const express = require("express")
const helmet = require("helmet")

const RouterFns = require('./routes/index.js')

const app = express();
const router = express.Router();

RouterFns.forEach((routerFn,index)=>{
    routerFn(router)
})


app.use(helmet())

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
    limit: "1mb"
}))

app.use("/api",router)

app.listen(3000, () => {

})