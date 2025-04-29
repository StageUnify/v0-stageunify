import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const socioEvents = await prisma.socioEvent.findMany({
      where: { eventId: params.id },
      include: {
        socio: true,
        event: true
      }
    })
    return NextResponse.json(socioEvents)
  } catch (error) {
    console.error('Error al obtener socio events:', error)
    return NextResponse.json(
      { error: 'Error al obtener los socio events' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { socioId, incomeAmount, expenseAmount, currency, notes } = body

    console.log('Intentando crear socio event con datos:', body)

    const socioEvent = await prisma.socioEvent.create({
      data: {
        socioId,
        eventId: params.id,
        incomeAmount,
        expenseAmount,
        currency,
        notes
      },
      include: {
        socio: true,
        event: true
      }
    })

    return NextResponse.json(socioEvent)
  } catch (error) {
    console.error('Error detallado al crear socio event:', error)
    return NextResponse.json(
      { error: `Error al crear el socio event: ${error.message}` },
      { status: 500 }
    )
  }
} 