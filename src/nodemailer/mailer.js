const nodemailer = require('nodemailer');
const  detail  = require('../config/configService');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: detail.user,
        pass: detail.pass
    }
});

module.exports={transporter}