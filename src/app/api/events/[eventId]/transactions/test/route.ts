import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    // Primero, crear las categorías si no existen
    const ticketSalesCategory = await prisma.category.upsert({
      where: { name_type: { name: 'TICKET_SALES', type: 'INCOME_EVENT' } },
      update: {},
      create: {
        name: 'TICKET_SALES',
        type: 'INCOME_EVENT',
        description: 'Ingresos por venta de entradas'
      }
    })

    const productionCategory = await prisma.category.upsert({
      where: { name_type: { name: 'PRODUCTION', type: 'EVENT_COS' } },
      update: {},
      create: {
        name: 'PRODUCTION',
        type: 'EVENT_COS',
        description: 'Gastos de producción'
      }
    })

    // Crear una transacción de ingreso por venta de entradas
    const ticketSalesTransaction = await prisma.transaction.create({
      data: {
        date: new Date(),
        type: 'INCOME_EVENT',
        categoryId: ticketSalesCategory.id,
        subcategory: 'GENERAL',
        detail: 'Venta de entradas generales',
        quantity: 100,
        unitAmount: 50,
        totalAmount: 5000,
        currency: 'USD',
        eventId: params.eventId,
        actorId: 'venue-1', // ID del venue que recibe el ingreso
        actorType: 'VENUE',
        distributions: {
          create: [
            {
              actorId: 'venue-1',
              actorType: 'VENUE',
              percentage: 100,
              amount: 5000
            }
          ]
        }
      }
    })

    // Crear una transacción de gasto por producción
    const productionExpenseTransaction = await prisma.transaction.create({
      data: {
        date: new Date(),
        type: 'EVENT_COS',
        categoryId: productionCategory.id,
        subcategory: 'SOUND',
        detail: 'Alquiler de equipo de sonido',
        quantity: 1,
        unitAmount: 2000,
        totalAmount: 2000,
        currency: 'USD',
        eventId: params.eventId,
        actorId: 'company-1', // ID de la compañía que paga
        actorType: 'COMPANY',
        distributions: {
          create: [
            {
              actorId: 'company-1',
              actorType: 'COMPANY',
              percentage: 100,
              amount: 2000
            }
          ]
        }
      }
    })

    // Obtener las transacciones con sus relaciones
    const [ticketSalesWithRelations, productionExpenseWithRelations] = await Promise.all([
      prisma.transaction.findUnique({
        where: { id: ticketSalesTransaction.id },
        include: {
          distributions: true,
          event: true,
          businessPartner: true
        }
      }),
      prisma.transaction.findUnique({
        where: { id: productionExpenseTransaction.id },
        include: {
          distributions: true,
          event: true,
          businessPartner: true
        }
      })
    ])

    return NextResponse.json({
      ticketSalesTransaction: ticketSalesWithRelations,
      productionExpenseTransaction: productionExpenseWithRelations
    })
  } catch (error) {
    console.error('Error creating test transactions:', error)
    return NextResponse.json(
      { error: 'Error creating test transactions', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 