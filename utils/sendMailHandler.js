import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
    forgotPasswordTemplate,
    resetSuccessTemplate,
    sendWelcomeTemplate,
    verificationTemplate,
} from "../emailtemplates/template.js";

dotenv.config();

class MailService {
    constructor() {
        (this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_SENDER_KEY,
            },
        })),
            (this.from = process.env.EMAIL_SENDER);
    }

    async sendVerificationMail(to, subject, verificationToken, software) {
        const mailOptions = {
            from: this.from,
            to: to,
            subject: subject,
            html: verificationTemplate(verificationToken, software),
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (err) {
            throw new Error(err);
        }
    }

    async sendWelcomeCall(to, subject, software) {
        const mailOptions = {
            from: this.from,
            to: to,
            subject: subject,
            html: sendWelcomeTemplate(software),
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (err) {
            throw new Error(err);
        }
    }

    async forgotPassword(to, subject, link, software) {
        const mailOptions = {
            from: this.from,
            to: to,
            subject: subject,
            html: forgotPasswordTemplate(link, software),
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (err) {
            throw new Error(err);
        }
    }

    async passwordRestSuccess(to, subject, software) {
        const mailOptions = {
            from: this.from,
            to: to,
            subject: subject,
            html: resetSuccessTemplate(software),
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default new MailService();