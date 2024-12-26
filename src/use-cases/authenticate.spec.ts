import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: UsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepository);
    });

    it("should be able authenticate", async () => {
        const password_hash = await hash("123456", 6);
        await usersRepository.create({
            name: "John Due",
            email: "johndue@example.com",
            password_hash
        });

        const { user } = await sut.handle({
            email: "johndue@example.com",
            password: "123456"
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it("should not be able to authenticate with wrong email", async () => {
        await expect(async () => {
            await sut.handle({
                email: "johndue@example.com",
                password: "123456"
            });
        }).rejects.toBeInstanceOf(InvalidCredentialsError);


    });

    it("should not be able to authenticate with wrong password", async () => {
        const password_hash = await hash("123456", 6);
        await usersRepository.create({
            name: "John Due",
            email: "johndue@example.com",
            password_hash
        });

        await expect(async () => {
            await sut.handle({
                email: "johndue@example.com",
                password: "1234576"
            });
        }).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});