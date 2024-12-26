import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetUserProfileUseCase } from "./get-user-profile";

let usersRepository: UsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetUserProfileUseCase(usersRepository);
    });

    it("should be able get user profile", async () => {
        const password_hash = await hash("123456", 6);
        const createdUser = await usersRepository.create({
            name: "John Due",
            email: "johndue@example.com",
            password_hash
        });

        const {user} = await sut.handle({
            userId: createdUser.id
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it("should not be able to get user profile with wrong id", async () => {
        await expect(async () => {
            await sut.handle({
                userId: "non-existing-id"
            });
        }).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

   
});