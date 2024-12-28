import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { RegisterUseCase } from "./register";

let usersRepository: UsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new RegisterUseCase(usersRepository);
    });

    it("should be able to register", async () => {


        const { user } = await sut.handle({ name: "John Due", email: "jonh.due@example.com", password: "12345" });

        expect(user.id).toEqual(expect.any(String));
    });


    it("should hash user password upon restriction", async () => {


        const { user } = await sut.handle({ name: "John Due", email: "jonh.due@example.com", password: "12345" });

        const isPasswordCorrectlyHashed = await compare("12345", user.password_hash);
        expect(isPasswordCorrectlyHashed).toBe(true);
    });


    it("should na be able to register with same email twice", async () => {


        const email = "jonh.due@example.com";

        await sut.handle({ name: "John Due", email, password: "12345" });

        await expect(async () => {
            await sut.handle({ name: "John Due", email, password: "12345" });
        }).rejects.toBeInstanceOf(UserAlreadyExistsError);

    });
});