import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { CheckIn } from "@prisma/client";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumbersOfCheckInError } from "./errors/max-numbers-of-check-ins-error";
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

    async handle({ gymId, userId, userLatitude, userLongitude }: CheckInUseCaseParams): Promise<CheckInUseCaseResult> {
        const gym = await this.gymsRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        const distance = getDistanceBetweenCoordinates({
            from: {
                latitude: userLatitude,
                longitude: userLongitude
            },
            to: {
                longitude: gym.longitude.toNumber(),
                latitude: gym.latitude.toNumber()
            }
        });

        // 100 metros
        const MAX_DISTANCE_IN_KILOMETERS = 0.1;

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError();
        }

        const checkInOneSomeDay = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date()
        );

        if (checkInOneSomeDay) {
            throw new MaxNumbersOfCheckInError();
        }

        const checkIn = await this.checkInsRepository.create({ user_id: userId, gym_id: gymId });

        return {
            checkIn
        };
    }
}