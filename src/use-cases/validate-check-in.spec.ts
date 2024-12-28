import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-erro";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ValidateCheckInUseCase } from "./validate-check-in";

let checkInsRepository: CheckInsRepository;
let sup: ValidateCheckInUseCase;

describe("Validate Check-in Use Case", () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sup = new ValidateCheckInUseCase(checkInsRepository);
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should be able to validate the check-in", async () => {
        vi.setSystemTime(new Date(2024,11,28, 15,48));
        const {id} = await checkInsRepository.create({
            gym_id: "gym-01",
            user_id: "user-01"
        });

        const { checkIn } = await sup.handle({
            checkInId: id
        });

        expect(checkIn.validated_at).toEqual(expect.any(Date));
        expect((await checkInsRepository.findById(id))?.validated_at).toEqual(expect.any(Date));
    });

    it("should be able to validate an inexistent check-in", async () => {
        vi.setSystemTime(new Date(2024,11,28, 15,48));

        await expect(async () => {
            await sup.handle({
                checkInId: "check-in-28"
            });
        }).rejects.toBeInstanceOf(ResourceNotFoundError);
  
    });

    it("should not be able to validate the check-in after 20 minutes of its creation ", async () =>{
        vi.setSystemTime(new Date(2024, 11, 28, 20, 56, 37));
        const {id} =  await  checkInsRepository.create({
            user_id: "user-01",
            gym_id: "gym-01"
        });
        const twentyOneMinutesInMs = 1000 * 60 * 21;

        vi.advanceTimersByTime(twentyOneMinutesInMs);
        await expect( async () => {
            await sup.handle({
                checkInId : id
            });
        }).rejects.toBeInstanceOf(LateCheckInValidationError);
    });

    

});