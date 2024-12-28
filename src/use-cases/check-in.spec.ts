import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: CheckInsRepository;
let sup: CheckInUseCase;

describe("Check-in Use Case", () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sup = new CheckInUseCase(checkInsRepository);
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should be able to check in", async () => {
        vi.setSystemTime(new Date(2024, 11, 27, 20, 56, 37));
        const { checkIn } = await sup.handle({
            gymId: "gym-01",
            userId: "user-01"
        });

        console.log(checkIn.create_at);

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it("should not be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2024, 11, 27, 20, 56, 37));

        await sup.handle({
            gymId: "gym-01",
            userId: "user-01"
        });

        await expect(async () => {
            await sup.handle({
                gymId: "gym-02",
                userId: "user-01"
            });
        }).rejects.toBeInstanceOf(Error);
    });


    it("should be able to check in twice but in different day", async () => {
        vi.setSystemTime(new Date(2024, 11, 27, 20, 56, 37));

        await sup.handle({
            gymId: "gym-01",
            userId: "user-01"
        });

        vi.setSystemTime(new Date(2024, 11, 28, 20, 56, 37));

        const { checkIn } = await sup.handle({
            gymId: "gym-02",
            userId: "user-01"
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

});