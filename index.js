require("express-async-errors");
const express = require("express")
const helmet = require("helmet")
const dotenv = require('dotenv');
dotenv.config()
const RouterFns = require('./routes/index.js')

const app = express();
const router = express.Router();

const client = require("./redis/index.js")

RouterFns.forEach((routerFn, index) => {
    routerFn(router)
})


app.use(helmet())

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
    limit: "1mb"
}))

app.use("/api", router)

client.on('connect', () => {
    console.log("redis client ok")
})

client.connect().then(()=>{

}).catch(err=>{
    console.log('err',err)

})

client.on('error', (err) => {
    console.log("redis client err", err)
})

app.listen(8080, () => {

})