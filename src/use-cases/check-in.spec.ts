import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumbersOfCheckInError } from "./errors/max-numbers-of-check-ins-error";

let checkInsRepository: CheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sup: CheckInUseCase;

describe("Check-in Use Case", () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sup = new CheckInUseCase(checkInsRepository, gymsRepository);

        await gymsRepository.create({
            id: "gym-01",
            title: "Gym 01",
            latitude: -21.4574357,
            longitude: -49.2229935
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
            userLatitude: -21.4580823,
            userLongitude:-49.2227977
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it("should not be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2024, 11, 27, 20, 56, 37));

        await sup.handle({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: -21.4580823,
            userLongitude:-49.2227977
        });

        await expect(async () => {
            await sup.handle({
                gymId: "gym-01",
                userId: "user-01",
                userLatitude: -21.4580823,
                userLongitude:-49.2227977
            });
        }).rejects.toBeInstanceOf(MaxNumbersOfCheckInError);
    });


    it("should be able to check in twice but in different day", async () => {
        vi.setSystemTime(new Date(2024, 11, 27, 20, 56, 37));

        await sup.handle({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: -21.4580823,
            userLongitude:-49.2227977
        });

        vi.setSystemTime(new Date(2024, 11, 28, 20, 56, 37));

        const { checkIn } = await sup.handle({
            gymId: "gym-01",
            userId: "user-01",
            userLatitude: -21.4580823,
            userLongitude:-49.2227977
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });


    it("should not be able to check in on distant gym", async () => {

        gymsRepository.gyms.push({
            id: "gym-02",
            title: "Gym 02",
            description: " ",
            phone: "",
            latitude: new Decimal(-21.4531121),
            longitude:  new Decimal(-49.2210893)
           
        });

        await expect(async () =>{
            await sup.handle({
                gymId: "gym-02",
                userId: "user-01",
                userLatitude: -21.4752958,
                userLongitude: -49.2210035
            });
        }).rejects.toBeInstanceOf(MaxDistanceError);

    });

});