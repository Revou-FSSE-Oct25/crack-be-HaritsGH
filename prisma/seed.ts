import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  // Generate 10 users
  for (let i = 1; i <= 10; i++) {
    const hashedPassword = await bcrypt.hash('pass', parseInt(process.env.BCRYPT_SALT_ROUNDS as string))
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
        prefix: prefixes[i - 2],
      },
    })
  }
  console.log('Registered users 2-4 to tournament 1')

  // Register users 5-8 to tournament 2
  const prefixes2 = ['Mr', 'Mrs', 'Miss', 'Ms']
  for (let i = 5; i <= 8; i++) {
    await prisma.participant.create({
      data: {
        tournamentId: 2,
        userId: i,
        alias: `Fighter ${i}`,
        prefix: prefixes2[i - 5],
      },
    })
  }
  console.log('Registered users 5-8 to tournament 2')

  // Register users 7-10 to tournament 3
  const prefixes3 = ['Capt', 'Lt', 'Sgt', 'Cpl']
  for (let i = 7; i <= 10; i++) {
    await prisma.participant.create({
      data: {
        tournamentId: 3,
        userId: i,
        alias: `Fighter ${i}`,
        prefix: prefixes3[i - 7],
      },
    })
  }
  console.log('Registered users 7-10 to tournament 3')
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