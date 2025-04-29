import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        venue: true,
        companyEvents: {
          include: {
            company: true
          }
        },
        socioEvents: {
          include: {
            socio: true
          }
        },
        venueEvents: {
          include: {
            venue: true
          }
        }
      }
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Evento no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error al obtener el evento:', error)
    return NextResponse.json(
      { error: 'Error al obtener el evento' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, date, location, organizer, venueId } = body

    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        name,
        date: new Date(date),
        location,
        organizer,
        venueId
      },
      include: {
        venue: true
      }
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error al actualizar el evento:', error)
    return NextResponse.json(
      { error: `Error al actualizar el evento: ${error.message}` },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.event.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Evento eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar el evento:', error)
    return NextResponse.json(
      { error: `Error al eliminar el evento: ${error.message}` },
      { status: 500 }
    )
  }
} 