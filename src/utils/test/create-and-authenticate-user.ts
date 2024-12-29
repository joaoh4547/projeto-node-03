import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import supertest from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
    await prisma.user.create({
        data: {
            name: "John Due",
            email: "john.doe@example.com",
            password_hash: await hash("123456", 6),
            role: isAdmin ? "ADMIN" : "MEMBER"
        }
    });

    const authResponse = await supertest(app.server)
        .post("/sessions")
        .send({
            email: "john.doe@example.com",
            password: "123456"
        });

    const { token } = authResponse.body;

    return { token };
}