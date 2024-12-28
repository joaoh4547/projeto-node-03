import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface CreateGymUseCaseParams {
  title: string,
  description?: string | null,
  phone?: string | null,
  latitude: number,
  longitude: number
}

interface CreateGymUseCaseResult {
  gym: Gym
}


export class CreateGymUseCase {
    constructor(private gymsRepository: GymsRepository) {
    }

    async handle({ title, description, phone, latitude, longitude }: CreateGymUseCaseParams): Promise<CreateGymUseCaseResult> {
        const gym = await this.gymsRepository.create({ title, description, phone, latitude, longitude });
        return { gym };
    }
}

