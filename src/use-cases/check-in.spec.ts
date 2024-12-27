import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { beforeEach, describe, expect, it } from "vitest";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: CheckInsRepository;
let sup: CheckInUseCase;

describe("Check-in Use Case",() =>{
    
    beforeEach(() =>{
        checkInsRepository = new InMemoryCheckInsRepository();
        sup = new CheckInUseCase(checkInsRepository);
    });

    it("should be able to check in", async () =>{
        const {checkIn} = await sup.handle({
            gymId: "gym-01",
            userId: "user-01"
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });
});