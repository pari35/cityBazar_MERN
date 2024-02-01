const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service:'gmail' ,
        auth: {
            user: 'paritoshpardeshi35@gmail.com',
            pass: 'uxvnezywojrsxuvy'
        },
        port: 465,
        secure: true,
        logger: true,
        debugg: true,
        secureConnection: false,
        tls: {
            rejectUnauthorized: true
        }
    })
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.Subject,
        text: options.message
    }
    let mailSend = await transporter.sendMail(mailOptions)
}

module.exports = sendEmail