import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const companies = await prisma.company.findMany()
    return NextResponse.json(companies)
  } catch (error) {
    console.error('Error al obtener companies:', error)
    return NextResponse.json(
      { error: 'Error al obtener las companies' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, legalName, taxId, address, city, state, country, email, phone } = body

    console.log('Intentando crear company con datos:', body)

    const company = await prisma.company.create({
      data: {
        name,
        legalName,
        taxId,
        address,
        city,
        state,
        country,
        email,
        phone
      }
    })

    return NextResponse.json(company)
  } catch (error) {
    console.error('Error detallado al crear company:', error)
    return NextResponse.json(
      { error: `Error al crear la company: ${error.message}` },
      { status: 500 }
    )
  }
} 