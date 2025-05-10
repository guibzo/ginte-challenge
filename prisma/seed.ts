import { type Prisma,PrismaClient } from '@prisma/client'

const customersSeed: Prisma.CustomerCreateInput[] = [
  {
    name: 'Latoya Bartoletti',
    email: 'alison412123131338@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },
  {
    name: 'Gabriel Vieira',
    email: 'alison481231313122@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },
  {
    name: 'Vitor Ribeiro',
    email: 'alison4814141242111@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },
  {
    name: 'Marcos Santos',
    email: 'alison483131231@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },
  {
    name: 'Neymar Junior',
    email: 'alison48151351352@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },
  {
    name: 'Latoya Bartoletti',
    email: 'alison48122144@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },
  {
    name: 'Latoya Bartoletti',
    email: 'alison48331313131@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },

  {
    name: 'Latoya Bartoletti',
    email: 'alison48312331313131@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },

  {
    name: 'Latoya Bartoletti',
    email: 'alison48331311133131@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },

  {
    name: 'Latoya Bartoletti',
    email: 'alison4833113131313131@hotmail.com',
    phone: '12981004104',
    birthdate: '20/06/2000',
    address: 'Rua XYZ',
  },

  {
    name: 'Latoya Bartoletti',
    email: 'alison483345553251313131@hotmail.com',
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
