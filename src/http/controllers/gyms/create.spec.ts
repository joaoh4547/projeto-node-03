import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Gym (E2E)", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to create a gym", async () => {

        const { token } = await createAndAuthenticateUser(app);

        const response = await supertest(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Gym 01",
                description : "description",
                phone: "17996558594",
                latitude: -21.4531121,
                longitude: -49.2210893
            });

        expect(response.statusCode).equal(201);
    });
});