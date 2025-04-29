import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: params.eventId,
      },
      include: {
        companyEvents: {
          include: {
            company: true,
          },
        },
        socioEvents: {
          include: {
            socio: true,
          },
        },
        venueEvents: {
          include: {
            venue: true,
          },
        },
        movements: true,
      },
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error getting event:', error)
    return NextResponse.json(
      { error: 'Error getting event' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const body = await request.json()
    const { name, description, startDate, endDate, type, status } = body

    const event = await prisma.event.update({
      where: {
        id: params.eventId,
      },
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        type,
        status,
      },
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { error: 'Error updating event' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    await prisma.event.delete({
      where: {
        id: params.eventId,
      },
    })

    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { error: 'Error deleting event' },
      { status: 500 }
    )
  }
} 