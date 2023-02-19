


const express = require('express')
const cors = require('cors')
require('../DBconnection/db')
const userRouters=require('../routes/user.routes')
const adminRouters=require('../routes/admin.routes')
const productRouters=require('../routes/product.routes')
const orderRouters=require('../routes/order.routes')
const cartRouters=require('../routes/cart.routes')
// const billsRouters=require('../routes/bill.routes')
const path = require('path');
const app = express()
app.use(cors())
app.use(express.json())
//app.use(express.static(path.join(__dirname,'/public')))
app.use(express.static('public'))
app.use(userRouters)
app.use(adminRouters)
app.use(productRouters)
app.use(orderRouters)
app.use(cartRouters)
// app.use(billsRouters)
module.exports=app