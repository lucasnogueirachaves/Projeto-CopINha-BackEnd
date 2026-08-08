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

    await prisma.news.deleteMany()
    await prisma.match.deleteMany()
    await prisma.team.deleteMany()
    await prisma.group.deleteMany()
    await prisma.admin.deleteMany()

    const passwordHash = await bcrypt.hash("12345678", 10)

    const admin = await prisma.admin.create({
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

    await prisma.news.createMany({
        data: [
            {
                title: "Brasil estreia com vitória na Copa",
                summary: "Seleção brasileira vence a Argentina na estreia e começa a competição com três pontos.",
                text: "O Brasil começou sua campanha na Copa com uma grande vitória sobre a Argentina. A equipe apresentou bom desempenho durante toda a partida e garantiu três pontos importantes para a classificação do Grupo A.",
                image: "brasil-vitoria.png",
                readingTime: 3,
                authorId: admin.id,
                groupId: groupA.id
            },
            {
                title: "Japão e México ficam no empate",
                summary: "As duas equipes fizeram uma partida equilibrada e dividiram os pontos.",
                text: "Japão e México fizeram um jogo equilibrado. As duas equipes tiveram oportunidades de gol, mas terminaram a partida empatadas. O resultado deixa a disputa pela classificação do Grupo A ainda mais aberta.",
                image: "japao-mexico.png",
                readingTime: 2,
                authorId: admin.id,
                groupId: groupA.id
            },
            {
                title: "França se prepara para a estreia",
                summary: "Seleção francesa realiza últimos treinamentos antes do primeiro jogo.",
                text: "A França encerrou sua preparação para a estreia na competição. O treinador aproveitou os últimos treinamentos para ajustar a equipe e definir os titulares para a primeira partida.",
                image: "franca-treino.png",
                readingTime: 3,
                authorId: admin.id,
                groupId: groupB.id
            },
            {
                title: "Tudo pronto para a Copa",
                summary: "Estádios e seleções se preparam para o início da competição.",
                text: "Com as seleções preparadas e os estádios prontos para receber os torcedores, a expectativa para o início da Copa é grande. A competição promete grandes partidas e muita disputa pela classificação.",
                image: "copa.png",
                readingTime: 2,
                authorId: admin.id,
                groupId: null
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