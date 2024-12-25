import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { RegisterUseCase } from "./register";

describe("Register Use Case", () => {

    it("should be able to register", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        const { user } = await registerUseCase.handle({ name: "John Due", email: "jonh.due@example.com", password: "12345" });

        expect(user.id).toEqual(expect.any(String));
    });


    it("should hash user password upon restriction", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        const { user } = await registerUseCase.handle({ name: "John Due", email: "jonh.due@example.com", password: "12345" });

        const isPasswordCorrectlyHashed = await compare("12345", user.password_hash);
        expect(isPasswordCorrectlyHashed).toBe(true);
    });


    it("should na be able to register with same email twice", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        const email = "jonh.due@example.com";

        await registerUseCase.handle({ name: "John Due", email, password: "12345" });

        await expect(async () => {
            await registerUseCase.handle({ name: "John Due", email, password: "12345" });
        }).rejects.toBeInstanceOf(UserAlreadyExistsError);

    });
});