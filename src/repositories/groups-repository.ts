import type { Prisma, Group } from "@/generated/prisma/client.js"

type GroupWithTeamsAndMatches = Prisma.GroupGetPayload<{
    include: {
        teams: true
        matches: {
            include: {
                homeTeam: true
                awayTeam: true
            }
        }
    }
}>

export interface GroupsRepository {
    create(data: Prisma.GroupCreateInput): Promise<Group>
    readMany(): Promise<Group[]>
    readId(publicId: string): Promise<Group | null>
    update(publicId: string, data: Prisma.GroupUpdateInput): Promise<Group | null>
    delete(publicId: string): Promise<void>
    classification(publicId: string): Promise<GroupWithTeamsAndMatches | null>
}