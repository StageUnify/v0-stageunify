import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const socios = await prisma.socio.findMany()
    return NextResponse.json(socios)
  } catch (error) {
    console.error('Error al obtener socios:', error)
    return NextResponse.json(
      { error: 'Error al obtener los socios' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, legalName, taxId, address, city, state, territory, country, email, phone } = body

    console.log('Intentando crear socio con datos:', body)

    const socio = await prisma.socio.create({
      data: {
        name,
        legalName,
        taxId,
        address,
        city,
        state,
        territory,
        country,
        email,
        phone
      }
    })

    return NextResponse.json(socio)
  } catch (error) {
    console.error('Error detallado al crear socio:', error)
    return NextResponse.json(
      { error: `Error al crear el socio: ${error.message}` },
      { status: 500 }
    )
  }
} 