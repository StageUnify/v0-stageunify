import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { eventId: string; socioEventId: string } }
) {
  try {
    const socioEvent = await prisma.socioEvent.findUnique({
      where: { 
        id: params.socioEventId,
        eventId: params.eventId 
      },
      include: {
        socio: true,
        event: true
      }
    })

    if (!socioEvent) {
      return NextResponse.json(
        { error: 'Socio event no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(socioEvent)
  } catch (error) {
    console.error('Error al obtener socio event:', error)
    return NextResponse.json(
      { error: 'Error al obtener el socio event' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { eventId: string; socioEventId: string } }
) {
  try {
    const body = await request.json()
    const { incomeAmount, expenseAmount, currency, notes } = body

    const socioEvent = await prisma.socioEvent.update({
      where: { 
        id: params.socioEventId,
        eventId: params.eventId
      },
      data: {
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
    console.error('Error al actualizar socio event:', error)
    return NextResponse.json(
      { error: `Error al actualizar el socio event: ${error.message}` },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { eventId: string; socioEventId: string } }
) {
  try {
    await prisma.socioEvent.delete({
      where: { 
        id: params.socioEventId,
        eventId: params.eventId
      }
    })

    return NextResponse.json({ message: 'Socio event eliminado exitosamente' })
  } catch (error) {
    console.error('Error al eliminar socio event:', error)
    return NextResponse.json(
      { error: `Error al eliminar el socio event: ${error.message}` },
      { status: 500 }
    )
  }
} 