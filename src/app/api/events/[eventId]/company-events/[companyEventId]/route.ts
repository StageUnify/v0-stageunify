import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { eventId: string; companyEventId: string } }
) {
  try {
    const companyEvent = await prisma.companyEvent.findUnique({
      where: { 
        id: params.companyEventId,
        eventId: params.eventId 
      },
      include: {
        company: true,
        event: true
      }
    })

    if (!companyEvent) {
      return NextResponse.json(
        { error: 'Company Event no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(companyEvent)
  } catch (error) {
    console.error('Error al obtener el company event:', error)
    return NextResponse.json(
      { error: 'Error al obtener el company event' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { eventId: string; companyEventId: string } }
) {
  try {
    const body = await request.json()
    const { companyId, incomeAmount, expenseAmount, currency, notes } = body

    const companyEvent = await prisma.companyEvent.update({
      where: { 
        id: params.companyEventId,
        eventId: params.eventId
      },
      data: {
        companyId,
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
    console.error('Error al actualizar el company event:', error)
    return NextResponse.json(
      { error: `Error al actualizar el company event: ${error.message}` },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { eventId: string; companyEventId: string } }
) {
  try {
    await prisma.companyEvent.delete({
      where: { 
        id: params.companyEventId,
        eventId: params.eventId
      }
    })

    return NextResponse.json({ message: 'Company Event eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar el company event:', error)
    return NextResponse.json(
      { error: `Error al eliminar el company event: ${error.message}` },
      { status: 500 }
    )
  }
} 