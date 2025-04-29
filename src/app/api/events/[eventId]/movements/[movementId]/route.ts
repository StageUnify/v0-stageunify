import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { eventId: string; movementId: string } }
) {
  try {
    const movement = await prisma.eventMovement.findUnique({
      where: {
        id: params.movementId,
        eventId: params.eventId
      },
      include: {
        event: true
      }
    })

    if (!movement) {
      return NextResponse.json(
        { error: 'Movimiento no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(movement)
  } catch (error) {
    console.error('Error al obtener el movimiento:', error)
    return NextResponse.json(
      { error: 'Error al obtener el movimiento' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { eventId: string; movementId: string } }
) {
  try {
    const body = await request.json()
    const { amount, type, description, date } = body

    const movement = await prisma.eventMovement.update({
      where: {
        id: params.movementId,
        eventId: params.eventId
      },
      data: {
        amount,
        type,
        description,
        date
      },
      include: {
        event: true
      }
    })

    return NextResponse.json(movement)
  } catch (error) {
    console.error('Error al actualizar el movimiento:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el movimiento' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { eventId: string; movementId: string } }
) {
  try {
    await prisma.eventMovement.delete({
      where: {
        id: params.movementId,
        eventId: params.eventId
      }
    })

    return NextResponse.json({ message: 'Movimiento eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar el movimiento:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el movimiento' },
      { status: 500 }
    )
  }
} 