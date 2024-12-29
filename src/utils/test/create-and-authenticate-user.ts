import { FastifyInstance } from "fastify";
import supertest from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance){
    await supertest(app.server)
        .post("/users")
        .send({
            name: "John Due",
            email: "john.doe@example.com",
            password: "123456"
        });
    const authResponse = await supertest(app.server)
        .post("/sessions")
        .send({
            email: "john.doe@example.com",
            password: "123456"
        });

    const {token} = authResponse.body;

    return {token};
}