import { app } from "@/app";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Refresh Token (E2E)", () => {

    beforeAll(async () => {
        await app.ready();
    });
    
    afterAll(async () => {
        await app.close();
    });

    it("should be able to refresh a token", async () => {
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

        const cookies = authResponse.get("Set-Cookie") || [];

        const response =  await supertest(app.server)
            .patch("/token/refresh")
            .set("Cookie", cookies)
            .send();

        expect(response.statusCode).equal(200);
        expect(response.body).toEqual({
            token: expect.any(String)
        });

        expect(response.get("Set-Cookie")).toEqual([
            expect.stringContaining("refreshToken=")
        ]);
    });
});