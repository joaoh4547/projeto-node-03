import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";

describe("Register Use Case", () => {
    it("should hash user password upon restriction", async () => {
        const registerUseCase = new RegisterUseCase({
            async create(data) {
                return {
                    id: "1",
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date()
                }; 
            },

            async findByEmail(email) {
                return null;
            },

        });

        const { user } = await registerUseCase.handle({ name: "John Due", email: "jonh.due@example.com", password: "12345" });

        const isPasswordCorrectlyHashed = await compare("12345", user.password_hash);
        expect(isPasswordCorrectlyHashed).toBe(true);
    });
});