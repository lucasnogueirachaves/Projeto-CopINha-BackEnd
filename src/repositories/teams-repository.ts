import type { Prisma, Team } from "@/generated/prisma/client.js"

export interface TeamsRepository {
    create(data: Prisma.TeamCreateInput): Promise<Team>
    readMany(): Promise<Team[]>
    readId(publicId: string): Promise<Team | null>
    update(publicId: string, data: Prisma.TeamUpdateInput): Promise<Team | null>
    delete(publicId: string): Promise<void>
}