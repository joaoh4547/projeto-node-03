import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckInUseCaseParams {
  userId: string
  gymId: string,
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResult {
  checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository) {
    }

    async handle({ gymId, userId, }: CheckInUseCaseParams): Promise<CheckInUseCaseResult> {
        const gym = await this.gymsRepository.findById(gymId);

        if(!gym){
            throw  new ResourceNotFoundError();
        }



        const checkInOneSomeDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());
        if (checkInOneSomeDay) {
            throw new Error();
        }

        const checkIn = await this.checkInsRepository.create({ user_id: userId, gym_id: gymId });

        return {
            checkIn
        };
    }
}