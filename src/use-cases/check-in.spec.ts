import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: CheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sup: CheckInUseCase;

describe("Check-in Use Case", () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sup = new CheckInUseCase(checkInsRepository, gymsRepository);
        gymsRepository.gyms.push({
            id: "gym-01",
            title: "Gym 01",
            description: " ",
            phone: "",
            latitude: new Decimal(0),
            longitude:  new Decimal(0)
           
        });
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should be able to check in", async () => {
     
        const { checkIn } = await sup.handle({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: 0,
            userLongitude: 0
        });

        console.log(checkIn.create_at);

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it("should not be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2024, 11, 27, 20, 56, 37));

        await sup.handle({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: 0,
            userLongitude : 0
        });

        await expect(async () => {
            await sup.handle({
                gymId: "gym-02",
                userId: "user-01",
                userLatitude: 0,
                userLongitude : 0
            });
        }).rejects.toBeInstanceOf(Error);
    });


    it("should be able to check in twice but in different day", async () => {
        vi.setSystemTime(new Date(2024, 11, 27, 20, 56, 37));

        await sup.handle({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: 0,
            userLongitude : 0
        });

        vi.setSystemTime(new Date(2024, 11, 28, 20, 56, 37));

        const { checkIn } = await sup.handle({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: 0,
            userLongitude : 0
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

});