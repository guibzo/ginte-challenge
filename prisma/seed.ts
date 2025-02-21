import { PrismaClient, type Prisma } from '@prisma/client'

const customersSeed: Prisma.CustomerCreateInput[] = [
  {
    name: 'Latoya Bartoletti',
    email: 'alison41238@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },
  {
    name: 'Gabriel Vieira',
    email: 'alison482@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },
  {
    name: 'Vitor Ribeiro',
    email: 'alison4811@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },
  {
    name: 'Marcos Santos',
    email: 'alison4831@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },
  {
    name: 'Neymar Junior',
    email: 'alison4812@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },
  {
    name: 'Latoya Bartoletti',
    email: 'alison4844@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },
  {
    name: 'Latoya Bartoletti',
    email: 'alison483131@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },
]

const prisma = new PrismaClient()

async function main() {
  for (const customer of customersSeed) {
    await prisma.customer.create({
      data: {
        ...customer,
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
