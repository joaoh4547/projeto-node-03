import { Gym, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
    private gyms: Gym[] = [];

    async findById(id: string) {
        const gym = this.gyms.find(gym => gym.id === id);
        if (!gym) {
            return null;
        }
        return gym;
    }

    async create({id,  title, description, phone, longitude, latitude }: Prisma.GymCreateInput) {
        const gym = {
            id: id ? id : randomUUID(),
            title,
            description: description ?? null,
            phone: phone ?? null,
            longitude: new Decimal(longitude.toString()),
            latitude: new Decimal(latitude.toString()),
            created_at: new Date()
        };

        this.gyms.push(gym);
        return gym;
    }

}