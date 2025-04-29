import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const company = await prisma.company.findUnique({
      where: { id: params.id }
    })

    if (!company) {
      return NextResponse.json(
        { error: 'Company no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(company)
  } catch (error) {
    console.error('Error al obtener la company:', error)
    return NextResponse.json(
      { error: 'Error al obtener la company' },
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
    const { name, legalName, taxId, address, city, state, country, email, phone } = body

    const company = await prisma.company.update({
      where: { id: params.id },
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
    console.error('Error al actualizar la company:', error)
    return NextResponse.json(
      { error: `Error al actualizar la company: ${error.message}` },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.company.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Company eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar la company:', error)
    return NextResponse.json(
      { error: `Error al eliminar la company: ${error.message}` },
      { status: 500 }
    )
  }
} 