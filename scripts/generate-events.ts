import { PrismaClient, EventType, EventStatus } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const eventTypes: EventType[] = [
  'CONCERT',
  'RESIDENCIA',
  'CACHET',
  'PRIVATE_EVENT',
  'FESTIVAL',
  'AFTER_PARTY',
  'COMERCIAL',
  'PR_EVENT'
]

const eventStatuses: EventStatus[] = [
  'DRAFT',
  'PLANNED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED'
]

async function generateEvents(count: number) {
  const events = []

  for (let i = 0; i < count; i++) {
    const startDate = faker.date.future()
    const endDate = new Date(startDate.getTime() + faker.number.int({ min: 2, max: 8 }) * 60 * 60 * 1000) // 2-8 hours after start

    const event = {
      name: faker.helpers.arrayElement([
        `${faker.music.genre()} Concert`,
        `${faker.company.name()} Event`,
        `${faker.person.firstName()}'s ${faker.helpers.arrayElement(['Birthday', 'Wedding', 'Anniversary'])}`,
        `${faker.company.name()} Festival`,
        `${faker.music.genre()} Festival`,
        `${faker.company.name()} After Party`,
        `${faker.company.name()} Commercial Event`,
        `${faker.company.name()} PR Event`
      ]),
      description: faker.lorem.paragraph(),
      startDate,
      endDate,
      type: faker.helpers.arrayElement(eventTypes),
      status: faker.helpers.arrayElement(eventStatuses),
    }

    events.push(event)
  }

  try {
    const createdEvents = await prisma.event.createMany({
      data: events,
      skipDuplicates: true,
    })

    console.log(`Created ${createdEvents.count} events successfully!`)
  } catch (error) {
    console.error('Error creating events:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Generate 10 random events
generateEvents(10) 