import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearbt-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function nearby(req: FastifyRequest, reply: FastifyReply) {

    const querySchema = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180;
        })
    });

    const {latitude, longitude } = querySchema.parse(req.body);
    const fetchNearbyGyms = makeFetchNearbyGymsUseCase();
    const {gyms} = await fetchNearbyGyms.handle({ userLatitude: latitude, userLongitude: longitude  });
    return reply.status(200).send({gyms});

}