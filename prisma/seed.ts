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
    const passwordHash = await bcrypt.hash("12345678", 10)

    await prisma.admin.create({
    data: {
        email: "admin@copinha.com",
        password: passwordHash
        }
    })
    const groupA = await prisma.group.create({
        data: {
            name: "Grupo A",
        }
    })

    const groupB = await prisma.group.create({
        data: {
            name: "Grupo B",
        }
    })

    await prisma.team.createMany({
        data: [
            {
                name: "Brasil",
                acronym: "BRA",
                flag: "brasil.png",
                groupId: groupA.id
            },
            {
                name: "Argentina",
                acronym: "ARG",
                flag: "argentina.png",
                groupId: groupA.id
            },
            {
                name: "Japão",
                acronym: "JPN",
                flag: "japao.png",
                groupId: groupA.id
            },
            {
                name: "México",
                acronym: "MEX",
                flag: "mexico.png",
                groupId: groupA.id
            }
        ]
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