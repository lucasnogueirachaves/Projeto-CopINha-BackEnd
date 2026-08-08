import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!
})

const prisma = new PrismaClient({
    adapter
})

async function main() {

    await prisma.match.deleteMany()
    await prisma.team.deleteMany()
    await prisma.group.deleteMany()
    await prisma.admin.deleteMany()

    const passwordHash = await bcrypt.hash("12345678", 10)

    await prisma.admin.create({
        data: {
            email: "admin@copinha.com",
            password: passwordHash
        }
    })

    const groupA = await prisma.group.create({
        data: {
            name: "Grupo A"
        }
    })

    const groupB = await prisma.group.create({
        data: {
            name: "Grupo B"
        }
    })

    const brasil = await prisma.team.create({
        data: {
            name: "Brasil",
            acronym: "BRA",
            flag: "brasil.png",
            groupId: groupA.id
        }
    })

    const argentina = await prisma.team.create({
        data: {
            name: "Argentina",
            acronym: "ARG",
            flag: "argentina.png",
            groupId: groupA.id
        }
    })

    const japao = await prisma.team.create({
        data: {
            name: "Japão",
            acronym: "JPN",
            flag: "japao.png",
            groupId: groupA.id
        }
    })

    const mexico = await prisma.team.create({
        data: {
            name: "México",
            acronym: "MEX",
            flag: "mexico.png",
            groupId: groupA.id
        }
    })

    await prisma.team.createMany({
        data: [
            {
                name: "França",
                acronym: "FRA",
                flag: "franca.png",
                groupId: groupB.id
            },
            {
                name: "Espanha",
                acronym: "ESP",
                flag: "espanha.png",
                groupId: groupB.id
            }
        ]
    })

    await prisma.match.createMany({
        data: [
            {
                date: new Date("2026-06-15T18:00:00Z"),
                local: "Estádio",
                homeGoals: null,
                awayGoals: null,
                status: "PROXIMO",
                groupId: groupA.id,
                homeTeamId: brasil.id,
                awayTeamId: argentina.id
            },
            {
                date: new Date("2026-06-16T18:00:00Z"),
                local: "Estádio",
                homeGoals: null,
                awayGoals: null,
                status: "PROXIMO",
                groupId: groupA.id,
                homeTeamId: japao.id,
                awayTeamId: mexico.id
            }
        ]
    })

    console.log("Banco populado com sucesso!")
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    })