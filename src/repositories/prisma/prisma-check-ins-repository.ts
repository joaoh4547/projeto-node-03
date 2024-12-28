import { prisma } from "@/lib/prisma";
import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { CheckInsRepository } from "../check-ins-repository";

export class PrismaCheckInsRepository implements CheckInsRepository {
    async create(data: Prisma.CheckInUncheckedCreateInput){
        return await prisma.checkIn.create({
            data
        });
    }
    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf("date");
        const endOfTheDay = dayjs(date).endOf("date");

        return await prisma.checkIn.findFirst({
            where:{
                user_id: userId,
                create_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate()
                }
            }
        });
    }
    async findManyByUserId(userId: string, page: number) {
        const PAGE_SIZE = 20;
        return await prisma.checkIn.findMany({
            where:{
                user_id: userId,
            },
            take:  PAGE_SIZE,
            skip: (page -1 ) * PAGE_SIZE
        });
    }
    async countByUserId(userId: string)   {
        return await prisma.checkIn.count({
            where:{
                user_id: userId
            }
        });
    }
    async findById(checkInId: string){
        return await prisma.checkIn.findUnique({
            where:{
                id: checkInId
            }
        });
    }
    async save(checkIn: CheckIn){
        return await prisma.checkIn.update({
            where:{
                id: checkIn.id
            },
            data: checkIn
        }); 
    }

}