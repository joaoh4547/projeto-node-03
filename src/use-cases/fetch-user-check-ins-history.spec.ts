import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: CheckInsRepository;
let sup: FetchUserCheckInsHistoryUseCase;

describe("Check-in Use Case", () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sup = new FetchUserCheckInsHistoryUseCase(checkInsRepository);


        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should be able to fetch check in history", async () => {

        await checkInsRepository.create({
            gym_id: "gym-01",
            user_id: "user-01",
        });

        await checkInsRepository.create({
            gym_id: "gym-02",
            user_id: "user-01",
        });

        const { checkIns } = await sup.handle({
            userId: "user-01",
        });

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({
                gym_id: "gym-01"
            }),
            expect.objectContaining({
                gym_id: "gym-02"
            })
        ]);
    });


    it("should be able to fetch paginated check in history", async () => {

        for (let i = 1; i <= 22; i++) {
            await checkInsRepository.create({
                gym_id: `gym-${i}`,
                user_id: "user-01",
            });
        }
        const { checkIns } = await sup.handle({
            userId: "user-01",
            page: 2,
        });

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: "gym-21" }),
            expect.objectContaining({ gym_id: "gym-22" }),
        ]);
    });
  

});