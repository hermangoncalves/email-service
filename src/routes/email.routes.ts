import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { EmailPayload } from "../interfaces/email.interface";
import { EmailService } from "../services/email.service";

export async function emailRoutes(fastify: FastifyInstance) {
  const emailService = new EmailService();

  fastify.post(
    "/send",
    {
      schema: {
        body: {
          type: "object",
          required: ["to", "subject", "text"],
          properties: {
            to: { type: "string", format: "email" },
            subject: { type: "string" },
            text: { type: "string" },
            html: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              provider: { type: "string" },
              messageId: { type: "string" },
              error: { type: "string" },
            },
            required: ["success"],
          },
        },
      },
    },
    async (
      request: FastifyRequest<{ Body: EmailPayload }>,
      reply: FastifyReply
    ) => {
      try {
        const payload = request.body;
        const result = await emailService.send(payload);

        return {
          success: result.success,
          provider: result.provider,
          messageId: result.messageId,
          error: result.error,
        };
      } catch (err: any) {
        fastify.log.error(err);

        return {
          success: false,
          provider: "",
          messageId: "",
          error: err?.message || "Unknown error",
        };
      }
    }
  );
}
