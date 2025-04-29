import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const socio = await prisma.socio.findUnique({
      where: { id: params.id }
    })

    if (!socio) {
      return NextResponse.json(
        { error: 'Socio no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(socio)
  } catch (error) {
    console.error('Error al obtener el socio:', error)
    return NextResponse.json(
      { error: 'Error al obtener el socio' },
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
    const { name, legalName, taxId, address, city, state, territory, country, email, phone } = body

    const socio = await prisma.socio.update({
      where: { id: params.id },
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
    console.error('Error al actualizar el socio:', error)
    return NextResponse.json(
      { error: `Error al actualizar el socio: ${error.message}` },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.socio.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Socio eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar el socio:', error)
    return NextResponse.json(
      { error: `Error al eliminar el socio: ${error.message}` },
      { status: 500 }
    )
  }
} 