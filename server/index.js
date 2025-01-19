const express = require('express')
const mongoose = require("mongoose");
const router = require('./Router/auth-router')
const cors = require("cors");

const PORT = 3001
const URL = "mongodb://localhost:27017/users02";
const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded())
app.use('/api',router)


app.listen(PORT, async () => {
    await mongoose.connect(URL)
    console.log(`Server startat in ${PORT}`)
})