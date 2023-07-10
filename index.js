const express = require('express');
const cors = require('cors');
const { connection } = require('./Connection/connection');
const { userRouter } = require('./Routes/user.routes');
const { restaurantRouter } = require('./Routes/restaurents.routes');
const { orderRouter } = require('./Routes/order.routes');
const app = express()
app.use(express.json())
app.use(cors())


app.use("/user", userRouter)
app.use("/restaurant", restaurantRouter)
app.use("/order", orderRouter)

app.listen(8080, async () => {
    try {
        await connection
        console.log("Server is connected to Database Succesfully");
    } catch (error) {
        console.log("Error While Connecting To Db");
    }
    console.log("Server is connected To Port 8080");
})