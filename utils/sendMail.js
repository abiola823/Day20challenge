const nodemailer  = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();
const options = {
    service: process.env.SERVICE,
    auth: {
        user: process.env.SENDER,
        pass: process.env.PASSWORD
    }
}; 


const send = nodemailer.createTransport(options);

module.exports = {
    send
};