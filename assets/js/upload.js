const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/send-email', upload.single('file'), (req, res) => {
    const { email, message } = req.body;
    const file = req.file;

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'udtohan.samuel_angelo@hnu.edu.ph',
    pass: 'udtohan24-0290-520'  
    }
});

const mailOptions = {
    from: 'udtohan.samuel_angelo@hnu.edu.ph', 
    to: 'udtohan.samuel_angelo@hnu.edu.ph', 
    subject: 'Result from Your Website',
    text: `Message: ${message}\n\nSent by: ${email}`,
    attachments: [
    {
        filename: file ? file.originalname : '',
        path: file ? file.path : '',
    }
    ]
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    return res.status(500).send('Error sending email');
    }
    res.status(200).send('Email sent: ' + info.response);
});
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});