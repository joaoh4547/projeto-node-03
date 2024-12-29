import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Check-in (E2E)", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to create a check-in", async () => {

        const { token } = await createAndAuthenticateUser(app);

        const gym =  await prisma.gym.create({
            data:{
                title: "Gym 01",
                latitude: -21.4531121,
                longitude: -49.2210893
            }
        });

        const response = await supertest(app.server)
            .post(`/gyms/${gym.id}/check-in`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                latitude: -21.4531121,
                longitude: -49.2210893
            });

        expect(response.statusCode).equal(201);
    });
});