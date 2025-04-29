const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    const event = await prisma.event.create({
      data: {
        id: 'cma2oke140001pnx62rz9pyqq',
        name: 'Concierto de Prueba',
        description: 'Evento de prueba para transacciones',
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-03-15'),
        status: 'PLANNED',
        type: 'CONCERT'
      }
    })

    console.log('Evento creado:', event)
  } catch (error) {
    console.error('Error al crear el evento:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 