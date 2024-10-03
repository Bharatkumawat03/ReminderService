const bodyParser = require('body-parser');
const express = require('express');

const {PORT, REMINDER_BINDING_KEY}=require('./config/serverConfig');
const { createChannel, subscribeMessage } = require('./utils/messageQueue');
// const { sendBaiscEmail } = require('./services/email-service');
// const cron = require('node-cron');

const TicketController = require('./controllers/ticket-controller');
const EmailService = require('./services/email-service');

const jobs = require('./utils/job');


const setupAndStartServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

    app.post('/api/v1/tickets', TicketController.create);
    

    app.listen(PORT, () => {
        console.log(`server started at PORT ${PORT}`);
        // jobs(); 

        // sendBaiscEmail(
        //     'support@admin.com',
        //     'potter0368harry@gmail.com',
        //     'this is a testing email',
        //     'hey, how are you, i hope you like the support'
        // );

        // cron.schedule('* * * * *', () => {
        //     console.log('running a task every minute');
        //   });
    });
}

setupAndStartServer();