import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { RegisterUseCase } from "@/use-cases/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { email, name, password } = registerBodySchema.parse(req.body);
    try {
        const usersRepository = new PrismaUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);
        await registerUseCase.handle({ email, name, password });
    }
    // eslint-disable-next-line
    catch (ignore) {
        reply.status(409).send();
    }


    return reply.status(201).send();

}