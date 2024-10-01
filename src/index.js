const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const {PORT}=require('./config/serverConfig');
const { sendBaiscEmail } = require('./services/email-service');

const setupAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, () => {
        console.log(`server started at PORT ${PORT}`);

        sendBaiscEmail(
            'support@admin.com',
            'potter0368harry@gmail.com',
            'this is a testing email',
            'hey, how are you, i hope you like the support'
        );
    });
}

setupAndStartServer();