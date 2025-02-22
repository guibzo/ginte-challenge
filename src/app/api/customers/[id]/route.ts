import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

type Params = {
  params: Promise<{
    id: string
  }>
}

export async function GET(
  req: NextRequest,
  { params }: Params,
): Promise<NextResponse> {
  const customerId = (await params).id

  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    })

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    return NextResponse.json(customer)
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { error: 'Error finding customer', message: error?.message ?? '' },
      { status: 500 },
    )
  }
}
