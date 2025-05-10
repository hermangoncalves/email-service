import { EmailPayload, EmailResponse } from "./email.interface";

export interface EmailProvider {
    name: string;
    send(payload: EmailPayload): Promise<EmailResponse>
    isHealthy(): Promise<boolean>
}