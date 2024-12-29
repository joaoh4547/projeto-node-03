import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile (E2E)", () => {

    beforeAll(async () => {
        await app.ready();
    });
    
    afterAll(async () => {
        await app.close();
    });

    it("should be able to get user profile", async () => {
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

        const response = await supertest(app.server)
            .get("/me")
            .set("Authorization",`Bearer ${token}`)          
            .send();    

        expect(response.statusCode).equal(200);
        expect(response.body.user).toEqual(expect.objectContaining({
            id: expect.any(String)
        }));
    });
});