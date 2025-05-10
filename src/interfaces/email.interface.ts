export interface EmailPayload {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
}

export interface EmailResponse {
  success: boolean;
  provider: string;
  messageId?: string;
  error?: string;
}
