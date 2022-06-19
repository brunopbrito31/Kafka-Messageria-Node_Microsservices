require('dotenv').config()
const express = require('express'),
    routes = express.Router(),
    routesApplication = require('./routes'),
    cors = require('cors')
    app = express()

const port = process.env.PORT_DEV
const routesByService = routesApplication.getRoutes(routes)

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
    app.use(routesByService)
})

app.listen(port, () => {
    console.log(`Application is running in port ${port}`)
})