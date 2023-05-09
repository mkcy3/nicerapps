import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  await prisma.charter.createMany({
    data: [
      {
        stripePi: 'pi_Stripetest',
        stripeIn: 'in_Stripetest',
        stripeCus: 'cus_Stripetest',
        clerkId: 'user_clerk',
        clerkEmail: 'clerk_primaryEmailAddress',
        sleepAboard: true,
        passengers: 3,
        activities: { sailing: true, adventure: true },
        startDate: new Date('2023-07-23'),
        endDate: new Date('2023-07-30'),
        total: 7500.0,
        tax: 975.0,
        deposit: 3000.0,
        balance: 4500.0,
      },

      {
        stripePi: 'pi_Stripetest2',
        stripeIn: 'in_Stripetest2',
        stripeCus: 'cus_Stripetest2',
        clerkId: 'user_clerk2',
        clerkEmail: 'clerk_primaryEmailAddress2',
        sleepAboard: false,
        passengers: 8,
        activities: { sailing: true, adventure: true },
        startDate: new Date('2023-06-24'),
        endDate: new Date('2023-06-24'),
        total: 1400.0,
        tax: 182.0,
        deposit: 560.0,
        balance: 840.0,
      },
    ],
  })
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
