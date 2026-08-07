import type { TeamsRepository } from "../teams-repository.js";
import {prisma} from '@/libs/prisma.js'
import type { Prisma } from "@/generated/prisma/client.js";

export class PrismaTeamsRepository implements TeamsRepository {
    async create(data: Prisma.TeamCreateInput) {
        return await prisma.team.create({data})
    }
    async readMany() {
        return await prisma.team.findMany({
            include: {
                group: true
            }
        })
    }
    async readId(publicId: string) {
        return await prisma.team.findUnique({
            where: {
                publicId
            }
        })
    }
    async update(publicId: string, data: Prisma.TeamUpdateInput) {
        return await prisma.team.update({
            where: {
                publicId
            }, data
        })
    }
    async delete(publicId: string) {
        await prisma.team.delete({
            where: {
                publicId
            }
        })
    }
}