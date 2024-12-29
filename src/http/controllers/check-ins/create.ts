import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {

    const createParamsSchema = z.object({
        gymId: z.string().uuid()
    });

    const createBodySchema = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180;
        })
    });

    const { latitude, longitude } = createBodySchema.parse(req.body);
    const { gymId } = createParamsSchema.parse(req.params);

    const checkIn = makeCheckInUseCase();
    await checkIn.handle({
        gymId, 
        userId: req.user.sub, 
        userLatitude: latitude,
        userLongitude: longitude
    });
    return reply.status(201).send();

}