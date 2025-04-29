import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        startDate: 'desc',
      },
    })
    return NextResponse.json(events)
  } catch (error) {
    console.error('Error getting events:', error)
    return NextResponse.json(
      { error: 'Error getting events' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, startDate, endDate, type, status } = body

    const event = await prisma.event.create({
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
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: `Error creating event: ${error.message}` },
      { status: 500 }
    )
  }
} 