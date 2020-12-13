var nodemailer = require('nodemailer');
// email sender function
const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'mckenzie72@ethereal.email',
        pass: '5ptScHtTvqfYUpTmhg'
    }
};

module.exports = nodemailer.createTransport(mailConfig);