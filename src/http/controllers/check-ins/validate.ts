import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validate(req: FastifyRequest, reply: FastifyReply) {

    const paramsSchema = z.object({
        checkInId: z.string().uuid()
    });

    const {  checkInId} = paramsSchema.parse(req.params);

    const validateCheckIn = makeValidateCheckInUseCase();
    await validateCheckIn.handle({
        checkInId
    });
    return reply.status(204).send();
}