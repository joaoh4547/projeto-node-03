import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(req: FastifyRequest, reply: FastifyReply) {
    try {
        await req.jwtVerify();
    }
    // eslint-disable-next-line
    catch (err) {
        return reply.status(401).send({ message: "Unauthorized" });
    }
} 