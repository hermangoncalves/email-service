import Fastify from "fastify";
import { emailRoutes } from "./routes/email.routes";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(emailRoutes, { prefix: "/api/email" });

fastify.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
