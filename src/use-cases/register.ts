import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterUseCaseParams {
  name: string,
  email: string,
  password: string
}

export class RegisterUseCase {
    constructor(private usersRepository: any){
    }

    async handle({ name, email, password }: RegisterUseCaseParams) {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (userWithSameEmail) {
            throw new Error("E-mail already exists.");
        }
        await this.usersRepository.create({ name, email, password_hash });

    }
}

