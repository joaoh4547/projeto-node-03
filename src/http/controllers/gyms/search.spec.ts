import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Gyms (E2E)", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to search a gym", async () => {

        const { token } = await createAndAuthenticateUser(app);

        await supertest(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Gym 01",
                description : "description",
                phone: "17996558594",
                latitude: -21.4531121,
                longitude: -49.2210893
            });

        await supertest(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Gym 02",
                description : "description",
                phone: "17996558594",
                latitude: -21.4531121,
                longitude: -49.2210893
            });

        const response = await supertest(app.server)
            .get("/gyms/search")
            .query({
                q: "Gym 01"
            })
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).equal(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: "Gym 01"
            })
        ]);
    });
});