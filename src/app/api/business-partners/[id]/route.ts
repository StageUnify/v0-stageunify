import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const businessPartner = await prisma.businessPartner.findUnique({
      where: { id: params.id }
    })

    if (!businessPartner) {
      return NextResponse.json(
        { error: 'Business Partner no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(businessPartner)
  } catch (error) {
    console.error('Error al obtener el business partner:', error)
    return NextResponse.json(
      { error: 'Error al obtener el business partner' },
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
    const { name, type, email, phone, address, notes } = body

    const businessPartner = await prisma.businessPartner.update({
      where: { id: params.id },
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
    console.error('Error al actualizar el business partner:', error)
    return NextResponse.json(
      { error: `Error al actualizar el business partner: ${error.message}` },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.businessPartner.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Business Partner eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar el business partner:', error)
    return NextResponse.json(
      { error: `Error al eliminar el business partner: ${error.message}` },
      { status: 500 }
    )
  }
} 