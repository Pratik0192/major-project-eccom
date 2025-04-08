import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.log("Provide EMAIL_USER and EMAIL_PASS inside the .env file");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})

const sendEmail = async({ sendTo, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: sendTo,
      subject: subject,
      html: html
    })

    console.log("email sent", info.response);

    return info;
    
  } catch (error) {
    console.log(error);
  }
}

export default sendEmail