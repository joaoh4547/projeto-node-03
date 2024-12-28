import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface CheckInUseCaseParams {
  userId: string
  gymId: string
}

interface CheckInUseCaseResult {
  checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {
    }

    async handle({ gymId, userId }: CheckInUseCaseParams): Promise<CheckInUseCaseResult> {

        const checkInOneSomeDay = await this.checkInsRepository.findByUserIdOnDate(userId,new Date());
        if(checkInOneSomeDay){
            throw new Error();
        }

        const checkIn = await this.checkInsRepository.create({ user_id: userId, gym_id: gymId });

        return {
            checkIn
        };
    }
}