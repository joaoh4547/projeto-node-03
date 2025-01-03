import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
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

        const { token } = await createAndAuthenticateUser(app);

        const response = await supertest(app.server)
            .get("/me")
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(response.statusCode).equal(200);
        expect(response.body.user).toEqual(expect.objectContaining({
            id: expect.any(String)
        }));
    });
});