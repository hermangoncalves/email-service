import { EmailProvider } from "../interfaces/email-provider.interface";
import { EmailPayload, EmailResponse } from "../interfaces/email.interface";
import { GmailProvider } from "../providers/gmail.provider";

export class EmailService {
  private providers: EmailProvider[];
  private currentProviderIndex: number = 0;

  constructor() {
    this.providers = [new GmailProvider()];
  }

  async send(payload: EmailPayload): Promise<EmailResponse> {
    let attempts = 0;
    const maxAttempts = this.providers.length;

    while (attempts < maxAttempts) {
      const provider = this.providers[this.currentProviderIndex];

      if (await provider.isHealthy()) {
        const result = await provider.send(payload);
        if (result.success) {
          return result;
        }
      }

      this.currentProviderIndex =
        (this.currentProviderIndex + 1) % this.providers.length;
      attempts++;
    }

    return {
      success: false,
      provider: "none",
      error: "All email providers failed",
    };
  }
}
