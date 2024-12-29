import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function metrics(req: FastifyRequest, reply: FastifyReply) {
    const getUserMetrics = makeGetUserMetricsUseCase();
    const { checkInsCount } = await getUserMetrics.handle({  userId: req.user.sub });
    return reply.status(200).send({ checkInsCount });
}