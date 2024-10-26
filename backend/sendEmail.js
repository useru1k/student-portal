require('dotenv').config();

const nodemailer = require('nodemailer');

const sendEmail = (subject, message) => {
    console.log("Sending email with subject:", subject);
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
            user: 'dummymemorylimit@gmail.com', 
            pass: 'mkle slif exyh ugxc',  
        },
    });

    let mailOptions = {
        from: 'dummymemorylimit@gmail.com', 
        to: 'mw612652@gmail.com', 
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
