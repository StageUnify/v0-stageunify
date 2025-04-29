import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const companyEvents = await prisma.companyEvent.findMany({
      where: { eventId: params.eventId },
      include: {
        company: true,
        event: true
      }
    })
    return NextResponse.json(companyEvents)
  } catch (error) {
    console.error('Error al obtener company events:', error)
    return NextResponse.json(
      { error: 'Error al obtener los company events' },
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
    const { companyId, incomeAmount, expenseAmount, currency, notes } = body

    console.log('Intentando crear company event con datos:', body)

    const companyEvent = await prisma.companyEvent.create({
      data: {
        companyId,
        eventId: params.eventId,
        incomeAmount,
        expenseAmount,
        currency,
        notes
      },
      include: {
        company: true,
        event: true
      }
    })

    return NextResponse.json(companyEvent)
  } catch (error) {
    console.error('Error detallado al crear company event:', error)
    return NextResponse.json(
      { error: `Error al crear el company event: ${error.message}` },
      { status: 500 }
    )
  }
} 