import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180;
        })
    });

    const { title, description, phone, latitude, longitude } = registerBodySchema.parse(req.body);
    const createGym = makeCreateGymUseCase();
    await createGym.handle({ title, description, phone, latitude, longitude });
    return reply.status(201).send();

}