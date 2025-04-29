import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const movements = await prisma.eventMovement.findMany({
      where: { eventId: params.eventId },
      include: {
        event: true
      }
    })

    return NextResponse.json(movements)
  } catch (error) {
    console.error('Error al obtener los movimientos:', error)
    return NextResponse.json(
      { error: 'Error al obtener los movimientos' },
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
    const { amount, type, description, date } = body

    const movement = await prisma.eventMovement.create({
      data: {
        amount,
        type,
        description,
        date,
        eventId: params.eventId
      },
      include: {
        event: true
      }
    })

    return NextResponse.json(movement)
  } catch (error) {
    console.error('Error al crear el movimiento:', error)
    return NextResponse.json(
      { error: 'Error al crear el movimiento' },
      { status: 500 }
    )
  }
} 