import nodemailer from 'nodemailer';
import pug from 'pug';
import { htmlToText } from 'html-to-text';

import IUser from '../interfaces/IUser';
import env from './validateEnv';

export default class Email {
   to: string;
   firstName: string;
   url: string;
   from: string;
   constructor(user: IUser, url: string) {
      this.to = user.email;
      this.firstName = user.firstName;
      this.url = url;
      this.from = `Adam Borsodi <${env.EMAIL_FROM}`;
   }

   private newTransport() {
      return nodemailer.createTransport({
         host: env.EMAIL_HOST,
         port: env.EMAIL_PORT,
         auth: {
            user: env.EMAIL_USERNAME,
            pass: env.EMAIL_PASSWORD,
         },
      });
   }

   public async send(template: string, subject: string) {
      const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
         firstName: this.firstName,
         url: this.url,
         subject,
      });

      const mailOptions = {
         from: this.from,
         to: this.to,
         subject,
         html,
         text: htmlToText(html),
      };

      await this.newTransport().sendMail(mailOptions);
   }

   public async sendPasswordReset() {
      await this.send('passwordReset', 'Your password reset token (valid for only 10 minutes)');
   }
}
