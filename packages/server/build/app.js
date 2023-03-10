// import express from 'express'
// import dotenv from 'dotenv'
// const app = express()
// if (process.env.NODE_ENV !== 'production') {
// 	dotenv.config({ path: './.env' })
// }
// const PORT = process.env.PORT || 3000
// app.get('/', (req, res) => {
// 	res.send('Hello World! PORT' + ' ' + PORT)
// })
// app.listen(PORT, () => {
// 	console.log(`Server running on  http://localhost:${PORT}`)
// })
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const allUsers = await prisma.beekeeperUser.findMany();
    console.log(allUsers);
}
main()
    .catch((e) => {
    console.error(e);
})
    .finally(async () => {
    await prisma.$disconnect();
});
