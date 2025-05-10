import { EmailProvider } from "../interfaces/email-provider.interface";
import { EmailPayload, EmailResponse } from "../interfaces/email.interface";
import nodemailer from "nodemailer";

export class GmailProvider implements EmailProvider {
  name = "Gmail";
  private transporter: nodemailer.Transporter | null = null;
  private senderEmail: string;

  constructor() {
    this.senderEmail = process.env.GMAIL_SENDER_EMAIL || "";
    this.initializeTransporter().catch((error) => {
      console.error("GmailProvider intialization failed", error);
    });
  }

  private async initializeTransporter() {
    if (!process.env.GMAIL_SENDER_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error("Gmail credentials not provided");
    }

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.senderEmail,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  async send(payload: EmailPayload): Promise<EmailResponse> {
    try {
      if (!this.transporter) {
        await this.initializeTransporter();
      }

      const mailOptions = {
        from: this.senderEmail,
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
      };

      const result = await this.transporter!.sendMail(mailOptions);

      console.log(result);

      return {
        success: true,
        provider: this.name,
        messageId: "Hello world",
      };
    } catch (error) {
      return {
        success: false,
        provider: this.name,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      if (!this.transporter) {
        await this.initializeTransporter();
      }

      await this.transporter!.verify();
      return true;
    } catch {
      return false;
    }
  }
}
