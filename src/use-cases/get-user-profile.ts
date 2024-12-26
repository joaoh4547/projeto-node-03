import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseParams {
  userId: string
}

interface GetUserProfileUseCaseResult {
  user: User
}


export class GetUserProfileUseCase {
    constructor(private usersRepository: UsersRepository) {
    }

    async handle({ userId }: GetUserProfileUseCaseParams): Promise<GetUserProfileUseCaseResult> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        return {
            user
        };
    }
}