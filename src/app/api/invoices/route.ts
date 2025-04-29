import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
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
    return NextResponse.json(invoices)
  } catch (error) {
    console.error('Error al obtener facturas:', error)
    return NextResponse.json(
      { error: 'Error al obtener las facturas' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { number, date, status, total, vendorId, entityId, companyId, venueId, socioId } = body

    console.log('Intentando crear factura con datos:', body)

    const invoice = await prisma.invoice.create({
      data: {
        number,
        date: new Date(date),
        status,
        total,
        ...(vendorId && {
          vendorInvoices: {
            create: {
              vendorId,
              ...(companyId && { companyId }),
              ...(venueId && { venueId }),
              ...(socioId && { socioId })
            }
          }
        }),
        ...(entityId && {
          entityInvoices: {
            create: {
              entityId,
              ...(companyId && { companyId }),
              ...(venueId && { venueId }),
              ...(socioId && { socioId })
            }
          }
        })
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
    console.error('Error detallado al crear factura:', error)
    return NextResponse.json(
      { error: `Error al crear la factura: ${error.message}` },
      { status: 500 }
    )
  }
} 