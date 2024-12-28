import { prisma } from "@/lib/prisma";
import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";

export class PrismaGymsRepository implements GymsRepository {
    async findById(id: string) {
        return await prisma.gym.findUnique({
            where: {
                id
            }
        });
    }
    async create(data: Prisma.GymCreateInput) {
        return await prisma.gym.create({
            data
        });
    }
    async searchMany(query: string, page: number) {
        const PAGE_SIZE = 20;
        return await prisma.gym.findMany({
            where: {
                title: {
                    contains: query,
                },

            },
            take: PAGE_SIZE,
            skip: (page - 1) * PAGE_SIZE

        });
    }
    async findManyNearby(params: FindManyNearbyParams) {
        return await prisma.$queryRaw<Gym[]>`SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${params.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) * sin( radians( latitude ) ) ) ) <= 10`;
    }

}