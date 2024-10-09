const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

//sample code to check server
app.get('/',function(req,res){
    res.send('Welcome to myPortfolio')
})



// Route for handling form submission
app.post('/send-email', (req, res) => {

  const { name, email, subject, message } = req.body;


  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email service
    auth: {
      user: 'ersnaveenkumar@gmail.com', // Your email
      pass: 'edyu bkdv fndm ahhs', // Use app-specific password for security
    },
  });

  // Mail options
  const mailOptions = {
    from: email,
    to: 'ersnaveenkumar@gmail.com', // Where you want to receive emails
    subject: `Contact form submission from ${name}`,
    text: `You have received a new message from ${name} (${email}):\n\n${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ status: 'fail', error });
    } else {
      console.log('Email sent:', info.response);
      return res.status(200).json({ status: 'success', info });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
 
});

