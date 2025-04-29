import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: {
        vendorInvoices: {
          include: {
            vendor: true,
            company: true,
            venue: true,
            socio: true
          }
        },
        entityInvoices: {
          include: {
            entity: true,
            company: true,
            venue: true,
            socio: true
          }
        }
      }
    })

    if (!invoice) {
      return NextResponse.json(
        { error: 'Factura no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(invoice)
  } catch (error) {
    console.error('Error al obtener la factura:', error)
    return NextResponse.json(
      { error: 'Error al obtener la factura' },
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
    const { number, date, status, total } = body

    const invoice = await prisma.invoice.update({
      where: { id: params.id },
      data: {
        number,
        date: new Date(date),
        status,
        total
      },
      include: {
        vendorInvoices: {
          include: {
            vendor: true,
            company: true,
            venue: true,
            socio: true
          }
        },
        entityInvoices: {
          include: {
            entity: true,
            company: true,
            venue: true,
            socio: true
          }
        }
      }
    })

    return NextResponse.json(invoice)
  } catch (error) {
    console.error('Error al actualizar la factura:', error)
    return NextResponse.json(
      { error: `Error al actualizar la factura: ${error.message}` },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.invoice.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Factura eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar la factura:', error)
    return NextResponse.json(
      { error: `Error al eliminar la factura: ${error.message}` },
      { status: 500 }
    )
  }
} 