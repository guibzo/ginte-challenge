import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const count = await prisma.customer.count()

    return NextResponse.json(count)
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { error: 'Error fetching customers', message: error?.message ?? '' },
      { status: 500 },
    )
  }
}
