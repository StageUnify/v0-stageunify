import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const venue = await prisma.venue.findUnique({
      where: { id: params.id }
    })

    if (!venue) {
      return NextResponse.json(
        { error: 'Venue no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(venue)
  } catch (error) {
    console.error('Error al obtener el venue:', error)
    return NextResponse.json(
      { error: 'Error al obtener el venue' },
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
    const { name, city, state, country, territory, capacity } = body

    const venue = await prisma.venue.update({
      where: { id: params.id },
      data: {
        name,
        city,
        state,
        country,
        territory,
        capacity: parseInt(capacity)
      }
    })

    return NextResponse.json(venue)
  } catch (error) {
    console.error('Error al actualizar el venue:', error)
    return NextResponse.json(
      { error: `Error al actualizar el venue: ${error.message}` },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.venue.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Venue eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar el venue:', error)
    return NextResponse.json(
      { error: `Error al eliminar el venue: ${error.message}` },
      { status: 500 }
    )
  }
} 