import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const venues = await prisma.venue.findMany()
    return NextResponse.json(venues)
  } catch (error) {
    console.error('Error al obtener venues:', error)
    return NextResponse.json(
      { error: 'Error al obtener los venues' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, city, state, country, territory, capacity } = body

    console.log('Intentando crear venue con datos:', body)

    const venue = await prisma.venue.create({
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
    console.error('Error detallado al crear venue:', error)
    return NextResponse.json(
      { error: `Error al crear el venue: ${error.message}` },
      { status: 500 }
    )
  }
} 