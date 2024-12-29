import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Validate Check-in (E2E)", () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to validate a check-in", async () => {

        const { token } = await createAndAuthenticateUser(app);
        const user = await prisma.user.findFirstOrThrow();
        const gym =  await prisma.gym.create({
            data:{
                title: "Gym 01",
                latitude: -21.4531121,
                longitude: -49.2210893
            }
        });

        let checkIn = await prisma.checkIn.create({
            data:
                {
                    gym_id: gym.id,
                    user_id: user.id
                }           
        });

        const response = await supertest(app.server)
            .patch(`/check-ins/${checkIn.id}/validate`)
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(response.statusCode).equal(204);

        checkIn = await prisma.checkIn.findUniqueOrThrow({where : {
            id: checkIn.id
        }});


        expect(checkIn.validated_at).toEqual(expect.any(Date));
    });
});