import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-erro";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ValidateCheckInUseCaseParams {
  checkInId: string
}

interface ValidateCheckInUseCaseResult {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository) {
    }

    async handle({ checkInId }: ValidateCheckInUseCaseParams): Promise<ValidateCheckInUseCaseResult> {
        const checkIn = await this.checkInsRepository.findById(checkInId);

        if (!checkIn) {
            throw new ResourceNotFoundError();
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.create_at, "minutes");
        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new LateCheckInValidationError();
        }

        checkIn.validated_at = new Date();

        await this.checkInsRepository.save(checkIn);

        return {
            checkIn
        };
    }
}