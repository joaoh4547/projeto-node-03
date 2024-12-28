import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./http/routes";

export const app = fastify();
app.register(fastifyJwt,{
    secret: env.JWT_SECRET
});
app.register(appRoutes);

app.setErrorHandler((err, _, reply) => {
    if (err instanceof ZodError) {
        return reply.status(400).send({ message: "Validation Error", issues: err.format() });
    }

    if (env.NODE_ENV !== "production") {
        console.error(err);
    }
    else {
        // TODO: here we should log to an external tool like Datadog/Sentry
    }

    return reply.status(500).send({ message: "Internal server error" });
});