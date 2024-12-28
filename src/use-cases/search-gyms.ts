import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface SearchGymsUseCaseParams {
  query: string,
  page?: number
}

interface SearchGymsUseCaseResult {
  gyms: Gym[]
}


export class SearchGymsUseCase {
    constructor(private gymsRepository: GymsRepository) {
    }

    async handle({ query,page = 1 }: SearchGymsUseCaseParams): Promise<SearchGymsUseCaseResult> {
        const gyms = await this.gymsRepository.searchMany(query,page);
        return { gyms };
    }
}

