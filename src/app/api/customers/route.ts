import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)

  const page = Number(searchParams.get('page')) || 1
  const itemsPerPage = Number(searchParams.get('itemsPerPage')) || 10
  const searchQuery = searchParams.get('search') || ''

  const itemsSkipQuantity = (page - 1) * itemsPerPage

  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: itemsPerPage,
      skip: itemsSkipQuantity,
      where: {
        OR: [
          {
            name: {
              contains: searchQuery,
            },
          },
          {
            email: {
              contains: searchQuery,
            },
          },
        ],
      },
    })

    return NextResponse.json(customers)
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { error: 'Error fetching customers', message: error?.message ?? '' },
      { status: 500 },
    )
  }
}
