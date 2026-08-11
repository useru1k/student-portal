require('dotenv').config();

const nodemailer = require('nodemailer');

const sendEmail = (subject, message) => {
    console.log("Sending email with subject:", subject);
    const EMAIL_USER = process.env.EMAIL_USER || 'dummymemorylimit@gmail.com';
    const EMAIL_PASS = process.env.EMAIL_PASS || 'mkle slif exyh ugxc';
    const EMAIL_FROM = process.env.EMAIL_FROM || EMAIL_USER;
    const EMAIL_TO = process.env.EMAIL_TO || 'mw612652@gmail.com';

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

    let mailOptions = {
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: subject,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = sendEmail;
