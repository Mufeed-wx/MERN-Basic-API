const express = require('express')
const app = express()
require('dotenv').config()
const dbCofig = require('./config/dbConfig')
const cors = require('cors')
const cookieSession = require('cookie-session')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')

app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge: 24 * 60 * 60 * 100,
    })
)

app.use(express.json())

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
)
app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)


const port = process.env.PORT || 5000
app.listen(port, () => console.log('Node server started', port))