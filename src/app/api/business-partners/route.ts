import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const businessPartners = await prisma.businessPartner.findMany()
    return NextResponse.json(businessPartners)
  } catch (error) {
    console.error('Error al obtener business partners:', error)
    return NextResponse.json(
      { error: 'Error al obtener los business partners' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, type, email, phone, address, notes } = body

    console.log('Intentando crear business partner con datos:', body)

    const businessPartner = await prisma.businessPartner.create({
      data: {
        name,
        type,
        email,
        phone,
        address,
        notes
      }
    })

    return NextResponse.json(businessPartner)
  } catch (error) {
    console.error('Error detallado al crear business partner:', error)
    return NextResponse.json(
      { error: `Error al crear el business partner: ${error.message}` },
      { status: 500 }
    )
  }
} 