import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
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
    return NextResponse.json(events)
  } catch (error) {
    console.error('Error al obtener eventos:', error)
    return NextResponse.json(
      { error: 'Error al obtener los eventos' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, date, location, organizer, venueId } = body

    console.log('Intentando crear evento con datos:', body)

    const event = await prisma.event.create({
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
    console.error('Error detallado al crear evento:', error)
    return NextResponse.json(
      { error: `Error al crear el evento: ${error.message}` },
      { status: 500 }
    )
  }
} 