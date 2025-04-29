import { prisma } from '@/lib/prisma'

const MOVEMENTS = [
  {
    type: 'INCOME',
    description: 'Venta de entradas VIP',
    amount: 50000,
    date: new Date('2024-03-15')
  },
  {
    type: 'INCOME',
    description: 'Venta de entradas Platea',
    amount: 30000,
    date: new Date('2024-03-15')
  },
  {
    type: 'INCOME',
    description: 'Venta de entradas General',
    amount: 20000,
    date: new Date('2024-03-15')
  },
  {
    type: 'EXPENSE',
    description: 'Alquiler del Teatro',
    amount: 25000,
    date: new Date('2024-03-14')
  },
  {
    type: 'EXPENSE',
    description: 'Pago a músicos',
    amount: 15000,
    date: new Date('2024-03-14')
  },
  {
    type: 'EXPENSE',
    description: 'Publicidad y marketing',
    amount: 5000,
    date: new Date('2024-03-10')
  },
  {
    type: 'EXPENSE',
    description: 'Seguros y permisos',
    amount: 3000,
    date: new Date('2024-03-10')
  },
  {
    type: 'INCOME',
    description: 'Patrocinio de empresa local',
    amount: 10000,
    date: new Date('2024-03-05')
  }
]

async function main() {
  try {
    // Buscar el evento "Concierto de Ópera"
    const event = await prisma.event.findFirst({
      where: {
        name: 'Concierto de Ópera'
      }
    })

    if (!event) {
      console.error('No se encontró el evento "Concierto de Ópera"')
      return
    }

    console.log(`Creando movimientos para el evento: ${event.name}`)

    // Crear los movimientos
    for (const movement of MOVEMENTS) {
      const createdMovement = await prisma.eventMovement.create({
        data: {
          ...movement,
          eventId: event.id
        }
      })
      console.log(`Movimiento creado: ${createdMovement.description} - ${createdMovement.amount}`)
    }

    console.log('Todos los movimientos han sido creados exitosamente')
  } catch (error) {
    console.error('Error al crear los movimientos:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 