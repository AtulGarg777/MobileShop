const nodemailer = require('nodemailer');
require('dotenv').config();

async function mailTransporter({ verifyUrl,
    to = 'atul.garg.212@gmail.com', subject = "Testing Nodemailer", text = "Hello Atul, How Are You?", }) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    })

    // console.log(process.env.NODEMAILER_USER)
    // Production Enhancements (Recommended)
    // pool: true,                     // Keeps connection alive for multiple emails
    // maxConnections: 5,              // Limits concurrent connections to avoid server bans
    // rateLimit: 10                   // Limits emails sent per second


    try {
        await transporter.verify();

    } catch (err) {
        console.log("error occured in email verification", err);

    }

    const mailOptions = {
        from: "agarg7731@gmail.com",
        to: `${to}`,
        subject: `${subject}`,
        text: `${text}`,
        html: `<h3>Click Below button to get verified</h3> <br/> <a href='${verifyUrl}'>verify</a>`
    }


    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("email  sending error occured", err);
        } else {
            console.log(info);

        }
    })
}

//data contained in info
// {
//   accepted: [ 'atul.garg.212@gmail.com' ],
//   rejected: [],
//   ehlo: [
//     'SIZE 35882577',
//     '8BITMIME',
//     'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
//     'ENHANCEDSTATUSCODES',
//     'PIPELINING',
//     'CHUNKING',
//     'SMTPUTF8'
//   ],
//   envelopeTime: 991,
//   messageTime: 977,
//   messageSize: 592,
//   response: '250 2.0.0 OK  1785429852 5a478bee46e88-31504b88e12sm23245615eec.11 - gsmtp',
//   envelope: { from: 'agarg7731@gmail.com', to: [ 'atul.garg.212@gmail.com' ] },
//   messageId: '<9281e480-b91c-05f4-bb5b-08ac2495f4b0@gmail.com>'
// }

module.exports = mailTransporter;
