const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const {PORT}=require('./config/serverConfig');

const setupAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, () => {
        console.log(`server started at PORT ${PORT}`);
    });
}

setupAndStartServer();