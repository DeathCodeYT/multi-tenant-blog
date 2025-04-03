// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "deathcodetesting@gmail.com",
    pass: "zkjbduywpdmqodax",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export function sendMail(reciver,subject,{text,html}) {
    // console.log("gmail Password: ", process.env.GMAIL_PASSWORD);
    return new Promise((resolve,reject)=>{
        let mailOptions={
            from: '"DeathCode" <deathcodetesting@gmail.com>', // sender address
            to: reciver, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                reject(error)
            }else{
                resolve(info)
            }
        })
    })
}
