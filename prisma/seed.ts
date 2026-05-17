import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Generate 10 users
  for (let i = 1; i <= 10; i++) {
    const hashedPassword = await bcrypt.hash(process.env.SEED_PASSWORD as string, parseInt(process.env.BCRYPT_SALT_ROUNDS as string))

    await prisma.user.create({
      data: {
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: hashedPassword,
      },
    })
  }
  console.log('Created 10 users')

  // Generate 3 tournaments
  const statuses = ['Upcoming', 'Ongoing', 'Completed']
  for (let i = 1; i <= 3; i++) {
    await prisma.tournament.create({
      data: {
        name: `Tournament ${i}`,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        utc: '+0',
        game: 'Game ' + i,
        status: statuses[i - 1],
        owner: 1, // Use user 1 as owner
        admins: [1],
      },
    })
  }
  console.log('Created 3 tournaments')

  // Register users 2-4 to tournament 1
  const prefixes = ['Dr', 'Prof', 'Sir']
  for (let i = 2; i <= 4; i++) {
    await prisma.participant.create({
      data: {
        tournamentId: 1,
        userId: i,
        alias: `Fighter ${i}`,
        prefix: prefixes[i % 3],
      },
    })
  }
  console.log('Registered users 2-4 to tournament 1')

  // Register users 5-8 to tournament 2
  const prefixes2 = ['Mr', 'Mrs', 'Miss', 'Ms']
  for (let i = 3; i <= 10; i++) {
    await prisma.participant.create({
      data: {
        tournamentId: 2,
        userId: i,
        alias: `Fighter ${i}`,
        prefix: prefixes2[i % 4],
      },
    })
  }
  console.log('Registered users 3-10 to tournament 2')

  // Register users 7-10 to tournament 3
  const prefixes3 = ['Capt', 'Lt', 'Sgt', 'Cpl']
  for (let i = 1; i <= 8; i++) {
    await prisma.participant.create({
      data: {
        tournamentId: 3,
        userId: i,
        alias: `Fighter ${i}`,
        prefix: prefixes3[i % 4],
      },
    })
  }
  console.log('Registered users 1-8 to tournament 3')

  // Generate tournament 2 bracket score
  console.log('Generating tournament 2 bracket score...')
  for (let i = 1; i <= 7; i++) {
    await prisma.bracketScore.create({
      data: {
        tournamentId: 2,
        matchId: i,
        userIds: [],
        scores: [0, 0],
        winnerId: null,
      },
    })
  }
  // Each round seeding
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 2,
        matchId: 1,
      },
    },
    data: {
      userIds: [3, 4],
      scores: [2, 0],
      winnerId: 3,
    },
  })
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 2,
        matchId: 2,
      },
    },
    data: {
      userIds: [6, 5],
      scores: [1, 2],
      winnerId: 5,
    },
  })
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 2,
        matchId: 3,
      },
    },
    data: {
      userIds: [7, 8],
      scores: [2, 1],
      winnerId: 7,
    },
  })
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 2,
        matchId: 4,
      },
    },
    data: {
      userIds: [9, 10],
      scores: [0, 2],
      winnerId: 10,
    },
  })
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 2,
        matchId: 5,
      },
    },
    data: {
      userIds: [3, 5],
      scores: [0, 2],
      winnerId: 5,
    },
  })
  console.log('Generated tournament 2 bracket score')

  // Generate tournament 3 bracket score
  console.log('Generating tournament 3 bracket score...')
  for (let i = 1; i <= 7; i++) {
    await prisma.bracketScore.create({
      data: {
        tournamentId: 3,
        matchId: i,
        userIds: [],
        scores: [0, 0],
        winnerId: null,
      },
    })
  }
  // Each round seeding
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 3,
        matchId: 1,
      },
    },
    data: {
      userIds: [3, 1],
      scores: [2, 0],
      winnerId: 3,
    },
  })
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 3,
        matchId: 2,
      },
    },
    data: {
      userIds: [2, 5],
      scores: [2, 1],
      winnerId: 2,
    },
  })
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 3,
        matchId: 3,
      },
    },
    data: {
      userIds: [4, 8],
      scores: [0, -1],
      winnerId: 4,
    },
  })
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 3,
        matchId: 4,
      },
    },
    data: {
      userIds: [6, 7],
      scores: [0, 2],
      winnerId: 7,
    },
  })
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 3,
        matchId: 5,
      },
    },
    data: {
      userIds: [3, 2],
      scores: [2, 0],
      winnerId: 3,
    },
  })
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 3,
        matchId: 6,
      },
    },
    data: {
      userIds: [4, 7],
      scores: [0, 2],
      winnerId: 7,
    },
  })
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 3,
        matchId: 7,
      },
    },
    data: {
      userIds: [3, 7],
      scores: [3, 1],
      winnerId: 3,
    },
  })
  console.log('Generated tournament 3 bracket score')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })