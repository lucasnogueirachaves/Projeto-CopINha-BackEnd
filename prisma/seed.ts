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

    const passwordHash = await bcrypt.hash("Teste135@", 6)

    const admin = await prisma.admin.create({
        data: {
            email: "admin@copinha.com",
            password: passwordHash
        }
    })

    const groupA = await prisma.group.create({ data: { name: "Grupo A" } })
    const groupB = await prisma.group.create({ data: { name: "Grupo B" } })
    const groupC = await prisma.group.create({ data: { name: "Grupo C" } })
    const groupD = await prisma.group.create({ data: { name: "Grupo D" } })

    const brasil = await prisma.team.create({
        data: { name: "Brasil", acronym: "BRA", flag: "https://flagcdn.com/w80/br.png", groupId: groupA.id }
    })
    const argentina = await prisma.team.create({
        data: { name: "Argentina", acronym: "ARG", flag: "https://flagcdn.com/w80/ar.png", groupId: groupA.id }
    })
    const japao = await prisma.team.create({
        data: { name: "Japão", acronym: "JPN", flag: "https://flagcdn.com/w80/jp.png", groupId: groupA.id }
    })
    const mexico = await prisma.team.create({
        data: { name: "México", acronym: "MEX", flag: "https://flagcdn.com/w80/mx.png", groupId: groupA.id }
    })

    const franca = await prisma.team.create({
        data: { name: "França", acronym: "FRA", flag: "https://flagcdn.com/w80/fr.png", groupId: groupB.id }
    })
    const espanha = await prisma.team.create({
        data: { name: "Espanha", acronym: "ESP", flag: "https://flagcdn.com/w80/es.png", groupId: groupB.id }
    })
    const alemanha = await prisma.team.create({
        data: { name: "Alemanha", acronym: "GER", flag: "https://flagcdn.com/w80/de.png", groupId: groupB.id }
    })
    const marrocos = await prisma.team.create({
        data: { name: "Marrocos", acronym: "MAR", flag: "https://flagcdn.com/w80/ma.png", groupId: groupB.id }
    })

    const portugal = await prisma.team.create({
        data: { name: "Portugal", acronym: "POR", flag: "https://flagcdn.com/w80/pt.png", groupId: groupC.id }
    })
    const uruguai = await prisma.team.create({
        data: { name: "Uruguai", acronym: "URU", flag: "https://flagcdn.com/w80/uy.png", groupId: groupC.id }
    })
    const croacia = await prisma.team.create({
        data: { name: "Croácia", acronym: "CRO", flag: "https://flagcdn.com/w80/hr.png", groupId: groupC.id }
    })
    const gana = await prisma.team.create({
        data: { name: "Gana", acronym: "GHA", flag: "https://flagcdn.com/w80/gh.png", groupId: groupC.id }
    })

    const inglaterra = await prisma.team.create({
        data: { name: "Inglaterra", acronym: "ENG", flag: "https://flagcdn.com/w80/gb-eng.png", groupId: groupD.id }
    })
    const belgica = await prisma.team.create({
        data: { name: "Bélgica", acronym: "BEL", flag: "https://flagcdn.com/w80/be.png", groupId: groupD.id }
    })
    const italia = await prisma.team.create({
        data: { name: "Itália", acronym: "ITA", flag: "https://flagcdn.com/w80/it.png", groupId: groupD.id }
    })
    const camaroes = await prisma.team.create({
        data: { name: "Camarões", acronym: "CMR", flag: "https://flagcdn.com/w80/cm.png", groupId: groupD.id }
    })

    await prisma.match.createMany({
        data: [
            // Grupo A — encerrados
            {
                date: new Date("2026-06-10T18:00:00Z"), local: "Maracanã",
                homeGoals: 3, awayGoals: 1, status: "ENCERRADO",
                groupId: groupA.id, homeTeamId: brasil.id, awayTeamId: argentina.id
            },
            {
                date: new Date("2026-06-10T15:00:00Z"), local: "Beira-Rio",
                homeGoals: 1, awayGoals: 1, status: "ENCERRADO",
                groupId: groupA.id, homeTeamId: japao.id, awayTeamId: mexico.id
            },
            // Grupo A — próximos
            {
                date: new Date("2026-06-16T18:00:00Z"), local: "Maracanã",
                homeGoals: null, awayGoals: null, status: "PROXIMO",
                groupId: groupA.id, homeTeamId: brasil.id, awayTeamId: mexico.id
            },
            {
                date: new Date("2026-06-16T15:00:00Z"), local: "Beira-Rio",
                homeGoals: null, awayGoals: null, status: "PROXIMO",
                groupId: groupA.id, homeTeamId: argentina.id, awayTeamId: japao.id
            },

            // Grupo B — encerrados
            {
                date: new Date("2026-06-11T18:00:00Z"), local: "Mineirão",
                homeGoals: 2, awayGoals: 0, status: "ENCERRADO",
                groupId: groupB.id, homeTeamId: franca.id, awayTeamId: marrocos.id
            },
            {
                date: new Date("2026-06-11T15:00:00Z"), local: "Arena Corinthians",
                homeGoals: 1, awayGoals: 1, status: "ENCERRADO",
                groupId: groupB.id, homeTeamId: espanha.id, awayTeamId: alemanha.id
            },
            // Grupo B — próximos
            {
                date: new Date("2026-06-17T18:00:00Z"), local: "Mineirão",
                homeGoals: null, awayGoals: null, status: "PROXIMO",
                groupId: groupB.id, homeTeamId: franca.id, awayTeamId: alemanha.id
            },
            {
                date: new Date("2026-06-17T15:00:00Z"), local: "Arena Corinthians",
                homeGoals: null, awayGoals: null, status: "PROXIMO",
                groupId: groupB.id, homeTeamId: espanha.id, awayTeamId: marrocos.id
            },

            // Grupo C — encerrados
            {
                date: new Date("2026-06-12T18:00:00Z"), local: "Arena Fonte Nova",
                homeGoals: 2, awayGoals: 1, status: "ENCERRADO",
                groupId: groupC.id, homeTeamId: portugal.id, awayTeamId: gana.id
            },
            {
                date: new Date("2026-06-12T15:00:00Z"), local: "Arena Pantanal",
                homeGoals: 0, awayGoals: 0, status: "ENCERRADO",
                groupId: groupC.id, homeTeamId: uruguai.id, awayTeamId: croacia.id
            },
            // Grupo C — próximos
            {
                date: new Date("2026-06-18T18:00:00Z"), local: "Arena Fonte Nova",
                homeGoals: null, awayGoals: null, status: "PROXIMO",
                groupId: groupC.id, homeTeamId: portugal.id, awayTeamId: croacia.id
            },
            {
                date: new Date("2026-06-18T15:00:00Z"), local: "Arena Pantanal",
                homeGoals: null, awayGoals: null, status: "PROXIMO",
                groupId: groupC.id, homeTeamId: uruguai.id, awayTeamId: gana.id
            },

            // Grupo D — encerrados
            {
                date: new Date("2026-06-13T18:00:00Z"), local: "Vila Belmiro",
                homeGoals: 3, awayGoals: 0, status: "ENCERRADO",
                groupId: groupD.id, homeTeamId: inglaterra.id, awayTeamId: camaroes.id
            },
            {
                date: new Date("2026-06-13T15:00:00Z"), local: "Estádio Nacional",
                homeGoals: 1, awayGoals: 2, status: "ENCERRADO",
                groupId: groupD.id, homeTeamId: belgica.id, awayTeamId: italia.id
            },
            // Grupo D — próximos
            {
                date: new Date("2026-06-19T18:00:00Z"), local: "Vila Belmiro",
                homeGoals: null, awayGoals: null, status: "PROXIMO",
                groupId: groupD.id, homeTeamId: inglaterra.id, awayTeamId: italia.id
            },
            {
                date: new Date("2026-06-19T15:00:00Z"), local: "Estádio Nacional",
                homeGoals: null, awayGoals: null, status: "PROXIMO",
                groupId: groupD.id, homeTeamId: belgica.id, awayTeamId: camaroes.id
            }
        ]
    })

    await prisma.news.createMany({
        data: [
            {
                title: "Brasil estreia com vitória na Copa",
                summary: "Seleção brasileira vence a Argentina na estreia e começa a competição com três pontos.",
                text: "O Brasil começou sua campanha na Copa com uma grande vitória sobre a Argentina. A equipe apresentou bom desempenho durante toda a partida e garantiu três pontos importantes para a classificação do Grupo A.",
                image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
                readingTime: 3, authorId: admin.id, groupId: groupA.id
            },
            {
                title: "Japão e México ficam no empate",
                summary: "As duas equipes fizeram uma partida equilibrada e dividiram os pontos.",
                text: "Japão e México fizeram um jogo equilibrado. As duas equipes tiveram oportunidades de gol, mas terminaram a partida empatadas. O resultado deixa a disputa pela classificação do Grupo A ainda mais aberta.",
                image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e",
                readingTime: 2, authorId: admin.id, groupId: groupA.id
            },
            {
                title: "França vence Marrocos com autoridade",
                summary: "Seleção francesa domina o jogo e vence por 2 a 0 na estreia do Grupo B.",
                text: "A França mostrou força ofensiva logo na estreia, vencendo Marrocos por 2 a 0. O time controlou a posse de bola durante quase toda a partida e criou diversas chances de gol.",
                image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c",
                readingTime: 3, authorId: admin.id, groupId: groupB.id
            },
            {
                title: "Espanha e Alemanha empatam em jogo movimentado",
                summary: "Duelo europeu termina empatado por 1 a 1 no Grupo B.",
                text: "Espanha e Alemanha protagonizaram um confronto movimentado, com boas chances para os dois lados. O resultado final foi de 1 a 1, mantendo a disputa do grupo em aberto.",
                image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6",
                readingTime: 2, authorId: admin.id, groupId: groupB.id
            },
            {
                title: "Portugal supera Gana e assume liderança do Grupo C",
                summary: "Seleção portuguesa vence por 2 a 1 e lidera a chave após a primeira rodada.",
                text: "Portugal fez valer o favoritismo e derrotou Gana por 2 a 1, assumindo a liderança do Grupo C. A vitória deixa a seleção portuguesa em boa posição na briga pela classificação.",
                image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
                readingTime: 3, authorId: admin.id, groupId: groupC.id
            },
            {
                title: "Uruguai e Croácia não saem do 0 a 0",
                summary: "Partida equilibrada no Grupo C termina sem gols.",
                text: "Uruguai e Croácia fizeram um jogo truncado e não conseguiram sair do 0 a 0. Apesar do resultado, as duas equipes seguem vivas na briga pela classificação do Grupo C.",
                image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9",
                readingTime: 2, authorId: admin.id, groupId: groupC.id
            },
            {
                title: "Inglaterra goleia Camarões na estreia",
                summary: "Seleção inglesa vence com facilidade por 3 a 0 no Grupo D.",
                text: "A Inglaterra teve uma estreia tranquila na competição, goleando Camarões por 3 a 0. O time inglês mostrou eficiência ofensiva e controle total da partida.",
                image: "https://images.unsplash.com/photo-1686484527934-6e49abf574be?w=800",
                readingTime: 3, authorId: admin.id, groupId: groupD.id
            },
            {
                title: "Itália surpreende e vence a Bélgica",
                summary: "Time italiano vence por 2 a 1 em jogo disputado do Grupo D.",
                text: "A Itália surpreendeu a Bélgica e venceu por 2 a 1 em uma partida disputada até o fim. O resultado coloca a seleção italiana bem posicionada para a sequência da fase de grupos.",
                image: "https://images.unsplash.com/photo-1522778034537-20a2486be803",
                readingTime: 2, authorId: admin.id, groupId: groupD.id
            },
            {
                title: "Tudo pronto para a Copa",
                summary: "Estádios e seleções se preparam para o início da competição.",
                text: "Com as seleções preparadas e os estádios prontos para receber os torcedores, a expectativa para o início da Copa é grande. A competição promete grandes partidas e muita disputa pela classificação.",
                image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
                readingTime: 2, authorId: admin.id, groupId: null
            },
            {
                title: "Como funciona o critério de desempate da fase de grupos",
                summary: "Entenda as regras usadas para definir a classificação em caso de empate em pontos.",
                text: "Em caso de empate em pontos entre duas ou mais seleções, o critério de desempate segue a ordem: confronto direto, saldo de gols geral e, por fim, número de gols marcados no grupo. Vale lembrar essas regras para acompanhar melhor a fase de grupos.",
                image: "https://images.unsplash.com/photo-1511204579483-e5c2b1d69acd?w=800",
                readingTime: 2, authorId: admin.id, groupId: null
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