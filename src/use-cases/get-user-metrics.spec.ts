import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { beforeEach, describe, expect, it } from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: CheckInsRepository;
let sup: GetUserMetricsUseCase;

describe("Get User Metrics  Use Case", () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sup = new GetUserMetricsUseCase(checkInsRepository);
    });

   

    it("should be able to get check ins count from metrics", async () => {

        await checkInsRepository.create({
            gym_id: "gym-01",
            user_id: "user-01",
        });

        await checkInsRepository.create({
            gym_id: "gym-02",
            user_id: "user-01",
        });

        const { checkInsCount } = await sup.handle({
            userId: "user-01",
        });

        expect(checkInsCount).toEqual(2);
    });
});