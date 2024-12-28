import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface FetchNearbyGymsUseCaseParams {
  userLongitude: number,
  userLatitude: number
}

interface FetchNearbyGymsUseCaseResult {
  gyms: Gym[]
}


export class FetchNearbyGymsUseCase {
    constructor(private gymsRepository: GymsRepository) {
    }

    async handle({ userLatitude,userLongitude }: FetchNearbyGymsUseCaseParams): Promise<FetchNearbyGymsUseCaseResult> {
        const gyms = await this.gymsRepository.findManyNearby({latitude: userLatitude, longitude: userLongitude});
        return { gyms };
    }
}

