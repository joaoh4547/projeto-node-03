import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register (E2E)", () => {

    beforeAll(async () => {
        await app.ready();
    });
    
    afterAll(async () => {
        await app.close();
    });

    it("should be able to register", async () => {
        const response = await supertest(app.server)
            .post("/users")
            .send({
                name: "John Due",
                email: "john.doe@example.com",
                password: "123456"
            });

        expect(response.statusCode).equal(201);
    });
});