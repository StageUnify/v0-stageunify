const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const TRANSACTIONS = [
  // Ingresos
  {
    fecha: new Date('2024-03-15'),
    tipo: 'INCOME_EVENT',
    categoria: 'TICKET_SALES',
    subcategoria: 'Venta de entradas',
    detalle: 'Venta de entradas VIP',
    cantidad: 100,
    montoUnitario: 500,
    montoTotal: 50000,
    moneda: 'USD',
    actorId: 'cma2oke140001pnx62rz9pyqq',
    actorType: 'EVENT',
    eventId: 'cma2oke140001pnx62rz9pyqq'
  },
  {
    fecha: new Date('2024-03-15'),
    tipo: 'INCOME_EVENT',
    categoria: 'TICKET_SALES',
    subcategoria: 'Venta de entradas',
    detalle: 'Venta de entradas Platea',
    cantidad: 200,
    montoUnitario: 300,
    montoTotal: 60000,
    moneda: 'USD',
    actorId: 'cma2oke140001pnx62rz9pyqq',
    actorType: 'EVENT',
    eventId: 'cma2oke140001pnx62rz9pyqq'
  },
  {
    fecha: new Date('2024-03-15'),
    tipo: 'INCOME_EVENT',
    categoria: 'TICKET_SALES',
    subcategoria: 'Venta de entradas',
    detalle: 'Venta de entradas General',
    cantidad: 300,
    montoUnitario: 200,
    montoTotal: 60000,
    moneda: 'USD',
    actorId: 'cma2oke140001pnx62rz9pyqq',
    actorType: 'EVENT',
    eventId: 'cma2oke140001pnx62rz9pyqq'
  },
  {
    fecha: new Date('2024-03-05'),
    tipo: 'INCOME_SPONSORSHIP',
    categoria: 'SPONSORSHIP',
    subcategoria: 'Patrocinio',
    detalle: 'Patrocinio de empresa local',
    cantidad: 1,
    montoUnitario: 10000,
    montoTotal: 10000,
    moneda: 'USD',
    actorId: 'cma2oke140001pnx62rz9pyqq',
    actorType: 'EVENT',
    eventId: 'cma2oke140001pnx62rz9pyqq'
  },
  // Gastos
  {
    fecha: new Date('2024-03-14'),
    tipo: 'EVENT_COS',
    categoria: 'RENTAL',
    subcategoria: 'Alquiler',
    detalle: 'Alquiler del Teatro',
    cantidad: 1,
    montoUnitario: 25000,
    montoTotal: 25000,
    moneda: 'USD',
    actorId: 'cma2oke140001pnx62rz9pyqq',
    actorType: 'EVENT',
    eventId: 'cma2oke140001pnx62rz9pyqq'
  },
  {
    fecha: new Date('2024-03-14'),
    tipo: 'EVENT_COS',
    categoria: 'TALENT',
    subcategoria: 'Artistas',
    detalle: 'Pago a músicos',
    cantidad: 1,
    montoUnitario: 15000,
    montoTotal: 15000,
    moneda: 'USD',
    actorId: 'cma2oke140001pnx62rz9pyqq',
    actorType: 'EVENT',
    eventId: 'cma2oke140001pnx62rz9pyqq'
  },
  {
    fecha: new Date('2024-03-10'),
    tipo: 'EVENT_COS',
    categoria: 'MARKETING',
    subcategoria: 'Publicidad',
    detalle: 'Publicidad y marketing',
    cantidad: 1,
    montoUnitario: 5000,
    montoTotal: 5000,
    moneda: 'USD',
    actorId: 'cma2oke140001pnx62rz9pyqq',
    actorType: 'EVENT',
    eventId: 'cma2oke140001pnx62rz9pyqq'
  },
  {
    fecha: new Date('2024-03-10'),
    tipo: 'EVENT_COS',
    categoria: 'LICENSES',
    subcategoria: 'Permisos',
    detalle: 'Seguros y permisos',
    cantidad: 1,
    montoUnitario: 3000,
    montoTotal: 3000,
    moneda: 'USD',
    actorId: 'cma2oke140001pnx62rz9pyqq',
    actorType: 'EVENT',
    eventId: 'cma2oke140001pnx62rz9pyqq'
  }
]

async function main() {
  try {
    const eventId = 'cma2oke140001pnx62rz9pyqq'
    
    // Verificar que el evento existe
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    })

    if (!event) {
      console.error(`No se encontró el evento con ID: ${eventId}`)
      return
    }

    console.log(`Creando transacciones para el evento: ${event.name}`)

    // Crear las transacciones
    for (const transaction of TRANSACTIONS) {
      const createdTransaction = await prisma.transaction.create({
        data: transaction
      })
      console.log(`Transacción creada: ${createdTransaction.detalle} - ${createdTransaction.montoTotal} ${createdTransaction.moneda}`)
    }

    console.log('Todas las transacciones han sido creadas exitosamente')
  } catch (error) {
    console.error('Error al crear las transacciones:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 