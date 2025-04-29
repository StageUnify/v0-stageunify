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

    // Crear subcategorías
    const generalTicketsSubcategory = await prisma.subcategory.upsert({
      where: { name_categoryId: { name: 'GENERAL', categoryId: ticketSalesCategory.id } },
      update: {},
      create: {
        name: 'GENERAL',
        type: 'INCOME_EVENT',
        description: 'Entradas generales',
        categoryId: ticketSalesCategory.id
      }
    })

    const soundSubcategory = await prisma.subcategory.upsert({
      where: { name_categoryId: { name: 'SOUND', categoryId: productionCategory.id } },
      update: {},
      create: {
        name: 'SOUND',
        type: 'EVENT_COS',
        description: 'Equipamiento de sonido',
        categoryId: productionCategory.id
      }
    })

    // Crear un ingreso por venta de entradas
    const ticketSalesIncome = await prisma.income.create({
      data: {
        date: new Date(),
        quantity: 100,
        unitPrice: 50,
        amount: 5000,
        currency: 'USD',
        description: 'Venta de entradas generales',
        eventId: params.eventId,
        categoryId: ticketSalesCategory.id,
        subcategoryId: generalTicketsSubcategory.id,
        distributions: {
          create: [
            {
              amount: 5000,
              paymentRole: 'RECEIVER',
              settledAmount: 0,
              pendingAmount: 5000
            }
          ]
        }
      },
      include: {
        category: true,
        subcategory: true,
        distributions: true
      }
    })

    // Crear un gasto de producción
    const productionExpense = await prisma.expense.create({
      data: {
        date: new Date(),
        quantity: 1,
        unitPrice: 2000,
        amount: 2000,
        currency: 'USD',
        description: 'Alquiler de equipo de sonido',
        eventId: params.eventId,
        categoryId: productionCategory.id,
        subcategoryId: soundSubcategory.id,
        distributions: {
          create: [
            {
              amount: 2000,
              paymentRole: 'PAYER',
              settledAmount: 0,
              pendingAmount: 2000
            }
          ]
        }
      },
      include: {
        category: true,
        subcategory: true,
        distributions: true
      }
    })

    return NextResponse.json({
      ticketSalesIncome,
      productionExpense
    })
  } catch (error) {
    console.error('Error creating test financial records:', error)
    return NextResponse.json(
      { error: 'Error creating test financial records', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 