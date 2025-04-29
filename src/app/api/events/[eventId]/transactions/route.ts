import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        eventId: params.eventId,
      },
      include: {
        distributions: true,
      },
    })
    return NextResponse.json(transactions)
  } catch (error) {
    console.error('Error getting transactions:', error)
    return NextResponse.json(
      { error: 'Error getting transactions' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const body = await request.json()
    const {
      date,
      type,
      category,
      subcategory,
      detail,
      quantity,
      unitAmount,
      totalAmount,
      currency,
      actorId,
      actorType,
      distributions,
    } = body

    console.log('Creating transaction with data:', body)

    const transaction = await prisma.transaction.create({
      data: {
        date,
        type,
        category,
        subcategory,
        detail,
        quantity,
        unitAmount,
        totalAmount,
        currency,
        eventId: params.eventId,
        actorId,
        actorType,
        distributions: {
          create: distributions,
        },
      },
      include: {
        distributions: true,
      },
    })

    return NextResponse.json(transaction)
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { error: 'Error creating transaction' },
      { status: 500 }
    )
  }
} 