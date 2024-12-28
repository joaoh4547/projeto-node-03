
import { GymsRepository } from "@/repositories/gyms-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: GymsRepository;
let sup: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sup = new FetchNearbyGymsUseCase(gymsRepository);
    });


    it("should be able to search gyms", async () => {

        await gymsRepository.create({
            id: "gym-01",
            title: "Gym 01",
            description: "",
            latitude: -21.4531121,
            longitude: -49.2210893
        });

        await gymsRepository.create({
            id: "gym-02",
            title: "Gym 02",
            description: "",
            latitude: -21.7804992,
            longitude: -48.8210587
        });

        const { gyms } = await sup.handle({
            userLatitude: -21.4752958,
            userLongitude: -49.2210035
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({
                id: "gym-01"
            })
        ]);
    });


    it("should be able to fetch paginated gyms search", async () => {
        // for(let i = 1; i <= 22; i++){
        //     await gymsRepository.create({
        //         title: `Gym ${i}`,
        //         description: "",
        //         latitude: 0,
        //         longitude: 0
        //     });
        // }

        // const {gyms} = await sup.handle({query: "Gym", page:2 });
        // expect(gyms).toHaveLength(2);
    });
  

});