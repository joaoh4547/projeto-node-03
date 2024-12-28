import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInsHistoryUseCaseParams {
    userId: string,
    page?: number 
}

interface FetchUserCheckInsHistoryUseCaseResult {
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {
    }

    async handle({  userId, page = 1 }: FetchUserCheckInsHistoryUseCaseParams): Promise<FetchUserCheckInsHistoryUseCaseResult> {
        const checkIns = await this.checkInsRepository.findManyByUserId(userId,page);
        return {
            checkIns
        };
    }
}