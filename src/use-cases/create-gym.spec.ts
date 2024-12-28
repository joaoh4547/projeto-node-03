import { GymsRepository } from "@/repositories/gyms-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: GymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymsRepository);
    });

    it("should be able to create gym", async () => {
        const { gym } = await sut.handle({ 
            title: "Gym 01",
            latitude: -21.4531121,
            longitude: -49.2210893
        });

        expect(gym.id).toEqual(expect.any(String));
    });


    
});