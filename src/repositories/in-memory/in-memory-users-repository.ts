import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
   

    private users: User[] = [];

    async findById(id: string) {
        return this.users.find(u => u.id === id) || null;
    }

    async create(data: Prisma.UserCreateInput) {
        const user: User = {
            id: "user-1",
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        };
        this.users.push(user);
        return user;
    }
    async findByEmail(email: string) {
        return this.users.find(u => u.email === email) || null;
    }

}