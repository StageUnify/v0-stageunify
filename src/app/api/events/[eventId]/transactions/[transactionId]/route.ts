import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { eventId: string; transactionId: string } }
) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: params.transactionId,
        eventId: params.eventId,
      },
      include: {
        distributions: true,
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error getting transaction:', error);
    return NextResponse.json(
      { error: 'Error getting transaction' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { eventId: string; transactionId: string } }
) {
  try {
    const body = await request.json();
    const {
      date,
      type,
      category,
      subcategory,
      detail,
      quantity,
      unitAmount,
      totalAmount,
      currency,
      actorId,
      actorType,
      distributions,
    } = body;

    // First delete existing distributions
    await prisma.transactionDistribution.deleteMany({
      where: {
        transactionId: params.transactionId,
      },
    });

    const transaction = await prisma.transaction.update({
      where: {
        id: params.transactionId,
        eventId: params.eventId,
      },
      data: {
        date,
        type,
        category,
        subcategory,
        detail,
        quantity,
        unitAmount,
        totalAmount,
        currency,
        actorId,
        actorType,
        distributions: {
          create: distributions,
        },
      },
      include: {
        distributions: true,
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json(
      { error: 'Error updating transaction' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { eventId: string; transactionId: string } }
) {
  try {
    // First delete distributions
    await prisma.transactionDistribution.deleteMany({
      where: {
        transactionId: params.transactionId,
      },
    });

    // Then delete the transaction
    await prisma.transaction.delete({
      where: {
        id: params.transactionId,
        eventId: params.eventId,
      },
    });

    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      { error: 'Error deleting transaction' },
      { status: 500 }
    );
  }
} 