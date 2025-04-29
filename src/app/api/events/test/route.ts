import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST() {
  try {
    const event = await prisma.event.create({
      data: {
        name: 'Concierto de Prueba',
        description: 'Este es un concierto de prueba para verificar la funcionalidad',
        startDate: new Date('2024-05-15T20:00:00Z'),
        endDate: new Date('2024-05-15T23:00:00Z'),
        status: "DRAFT",
        type: 'CONCERT',
      },
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error creating test event:', error)
    return NextResponse.json(
      { error: 'Error creating test event', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 