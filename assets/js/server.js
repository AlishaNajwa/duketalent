const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const upload = multer();

// Define the route for sending email
app.post('/send-email', upload.none(), async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Configure Nodemailer
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service provider
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-email-password'  // Your email password
        }
    });

    // Mail options
    let mailOptions = {
        from: email,
        to: 'your-email@gmail.com', // Your receiving email
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Email sent successfully!');
    } catch (error) {
        console.error(error);
        res.send('Failed to send email.');
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
