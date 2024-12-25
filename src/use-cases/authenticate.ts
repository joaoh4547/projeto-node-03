import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateUseCaseParams {
  email: string
  password: string
}

interface AuthenticateUseCaseResult{
  user: User
}


export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {
    }

    async execute({ email, password }: AuthenticateUseCaseParams): Promise<AuthenticateUseCaseResult> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new InvalidCredentialsError();
        }
        const doesPasswordMatches = compare(password,user.password_hash);

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError();
        }

        return {
            user
        };
    }
}