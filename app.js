var express = require('express')
var app = express()
var port = 8080

app.use(express.static('html'))

app.listen(process.env.PORT || 5000)
