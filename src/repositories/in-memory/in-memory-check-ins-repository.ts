import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";
import { CheckInsRepository } from "../check-ins-repository";

export class InMemoryCheckInsRepository implements CheckInsRepository {

    private checkIns: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn: CheckIn = {
            id: randomUUID(),
            create_at: new Date(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null
        };

        this.checkIns.push(checkIn);
        return checkIn;
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf("date");
        const endOfTheDay = dayjs(date).endOf("date");

      
        const checkInOnSameDate = this.checkIns.find(checkIn => {
            const checkInDate = dayjs(checkIn.create_at);
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
            return checkIn.user_id === userId && isOnSameDate;
        });
        if(!checkInOnSameDate){
            return null;
        }
        return checkInOnSameDate;
    }

    async findManyByUserId(userId: string, page: number) {
        const PAGE_SIZE = 20;
        return this.checkIns
            .filter((checkIn) => checkIn.user_id === userId)
            .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    }

    async countByUserId(userId: string) {
        return this.checkIns.filter(checkIn => checkIn.user_id === userId).length;
    }

    async findById(checkInId: string) {
        return this.checkIns.find(checkIn => checkIn.id === checkInId) || null;
    }

    async save(checkIn: CheckIn) {
        const checkInIndex = this.checkIns.findIndex(c => c.id === checkIn.id);
        if(checkInIndex !== -1){
            this.checkIns[checkInIndex] = checkIn;
        }
        return checkIn;
    }

}