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

    await prisma.user.upsert({
      where: { username: `user${i}` },
      update: {},
      create: {
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: hashedPassword,
      },
    })
  }
  console.log('Created 10 users')

  // Generate 4 tournaments
  const statuses = ['Upcoming', 'Ongoing', 'Completed', 'Completed']
  for (let i = 1; i <= 4; i++) {
    await prisma.tournament.upsert({
      where: { id: i },
      update: {},
      create: {
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
  console.log('Created 4 tournaments')

  // Register users 2-4 to tournament 1
  const prefixes = ['Dr', 'Prof', 'Sir']
  for (let i = 2; i <= 4; i++) {
    await prisma.participant.upsert({
      where: {
        tournamentId_userId: {
          tournamentId: 1,
          userId: i,
        },
      },
      update: {},
      create: {
        tournamentId: 1,
        userId: i,
        alias: `Fighter ${i}`,
        prefix: prefixes[i % 3],
        participateTime: new Date(Date.now() + (i - 2) * 5 * 60 * 1000), // 5 minutes apart
      },
    })
  }
  console.log('Registered users 2-4 to tournament 1')

  // Register users 3-10 to tournament 2
  const prefixes2 = ['Mr', 'Mrs', 'Miss', 'Ms']
  for (let i = 3; i <= 10; i++) {
    await prisma.participant.upsert({
      where: {
        tournamentId_userId: {
          tournamentId: 2,
          userId: i,
        },
      },
      update: {},
      create: {
        tournamentId: 2,
        userId: i,
        alias: `Fighter ${i}`,
        prefix: prefixes2[i % 4],
        participateTime: new Date(Date.now() + (i - 3) * 5 * 60 * 1000), // 5 minutes apart
      },
    })
  }
  console.log('Registered users 3-10 to tournament 2')

  // Register users 1-8 to tournament 3
  const prefixes3 = ['Capt', 'Lt', 'Sgt', 'Cpl']
  for (let i = 1; i <= 8; i++) {
    await prisma.participant.upsert({
      where: {
        tournamentId_userId: {
          tournamentId: 3,
          userId: i,
        },
      },
      update: {},
      create: {
        tournamentId: 3,
        userId: i,
        alias: `Fighter ${i}`,
        prefix: prefixes3[i % 4],
        participateTime: new Date(Date.now() + (i - 1) * 5 * 60 * 1000), // 5 minutes apart
      },
    })
  }
  console.log('Registered users 1-8 to tournament 3')

  // Register users 1-5 to tournament 4
  const prefixes4 = ['Capt', 'Lt', 'Sgt', 'Cpl', 'Pvt']
  for (let i = 1; i <= 5; i++) {
    await prisma.participant.upsert({
      where: {
        tournamentId_userId: {
          tournamentId: 4,
          userId: i,
        },
      },
      update: {},
      create: {
        tournamentId: 4,
        userId: i,
        alias: `Fighter ${i}`,
        prefix: prefixes4[i % 5],
      },
    })
  }
  console.log('Registered users 1-5 to tournament 4')

  // Generate tournament 2 bracket score
  console.log('Generating tournament 2 bracket score...')
  for (let i = 1; i <= 7; i++) {
    await prisma.bracketScore.upsert({
      where: {
        tournamentId_matchId: {
          tournamentId: 2,
          matchId: i,
        },
      },
      update: {},
      create: {
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
      userIds: [5, 6],
      scores: [1, 2],
      winnerId: 6,
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
      userIds: [3, 6],
      scores: [0, 2],
      winnerId: 6,
    },
  })
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 2,
        matchId: 6,
      },
    },
    data: {
      userIds: [7, 10],
      // scores: [0, 0],
      // winnerId: null,
    },
  })
  console.log('Generated tournament 2 bracket score')

  // Generate tournament 3 bracket score
  console.log('Generating tournament 3 bracket score...')
  for (let i = 1; i <= 7; i++) {
    await prisma.bracketScore.upsert({
      where: {
        tournamentId_matchId: {
          tournamentId: 3,
          matchId: i,
        },
      },
      update: {},
      create: {
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
      userIds: [1, 8],
      scores: [2, 0],
      winnerId: 1,
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
      userIds: [2, 7],
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
      userIds: [3, 6],
      scores: [0, -1],
      winnerId: 3,
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
      userIds: [5, 4],
      scores: [0, 2],
      winnerId: 4,
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
      userIds: [1, 2],
      scores: [2, 0],
      winnerId: 1,
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
      userIds: [3, 4],
      scores: [0, 2],
      winnerId: 4,
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
      userIds: [1, 4],
      scores: [3, 1],
      winnerId: 1,
    },
  })
  console.log('Generated tournament 3 bracket score')

  // Generate tournament 4 bracket score
  console.log('Generating tournament 4 bracket score...')
  for (let i = 1; i <= 4; i++) {
    await prisma.bracketScore.upsert({
      where: {
        tournamentId_matchId: {
          tournamentId: 4,
          matchId: i,
        },
      },
      update: {},
      create: {
        tournamentId: 4,
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
        tournamentId: 4,
        matchId: 1,
      },
    },
    data: {
      userIds: [5, 4],
      scores: [2, 0],
      winnerId: 5,
    },
  })
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 4,
        matchId: 2,
      },
    },
    data: {
      userIds: [1, 5],
      scores: [0, 2],
      winnerId: 5,
    },
  })
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 4,
        matchId: 3,
      },
    },
    data: {
      userIds: [2, 3],
      scores: [1, 2],
      winnerId: 3,
    },
  })
  await prisma.bracketScore.update({
    where: {
      tournamentId_matchId: {
        tournamentId: 4,
        matchId: 4,
      },
    },
    data: {
      userIds: [5, 3],
      scores: [2, 0],
      winnerId: 5,
    },
  })
  console.log('Generated tournament 4 bracket score')
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