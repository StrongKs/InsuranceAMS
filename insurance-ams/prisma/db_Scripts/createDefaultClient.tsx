import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
export default prisma;

async function main() {
  const defaultClient = await prisma.client.create( { data: { Fname: "John", Lname: "Doe", email: "JohnDoe@gmail.com", phone: "123-456-7890", DOB: new Date('1990-01-01'), gender: "Male", address: "123 Main St" } } )
  console.log(defaultClient)
}


main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })