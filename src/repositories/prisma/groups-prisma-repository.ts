import type { GroupsRepository } from "../groups-repository.js";
import {prisma} from '@/libs/prisma.js'
import type { Prisma } from "@/generated/prisma/client.js";

export class PrismaGroupsRepository implements GroupsRepository {
    async create(data: Prisma.GroupCreateInput) {
        return await prisma.group.create({data})
    }
    async readMany() {
        return await prisma.group.findMany({
            include: {
                teams: true
            }
        })
    }
    async readId(publicId: string) {
        return await prisma.group.findUnique({
            where: {
                publicId
            },
            include: {
                teams: true
            }
        })
    }
    async update(publicId: string, data: Prisma.GroupUpdateInput) {
        return await prisma.group.update({
            where: {
                publicId
            }, data
        })
    }
    async delete(publicId: string) {
        await prisma.group.delete({
            where: {
                publicId
            }
        })
    }
    async classification(publicId: string) {
        return prisma.group.findUnique({
            where: {
                publicId
            },
            include: {
                teams: true,
                matches: {
                    include: {
                        homeTeam: true,
                        awayTeam: true
                    }
                }
            }
        })
    }
    async countTeams(groupId: number) {
        return prisma.team.count({
            where: {
                groupId
            }
        })
    }
}