import express from 'express'
import dotenv from 'dotenv'
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

const createContext = ({
	req,
	res,
  }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
  type Context = inferAsyncReturnType<typeof createContext>;
  const t = initTRPC.context<Context>().create();
  const appRouter = t.router({
	// [...]
  });

const app = express()

app.use(
	'/trpc',
	trpcExpress.createExpressMiddleware({
	  router: appRouter,
	  createContext,
	}),
  );

if (process.env.NODE_ENV !== 'production') {
	dotenv.config({ path: './.env' })
}

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Server running on  http://localhost:${PORT}`)
})

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// async function main() {

// 	const allUsers = await prisma.beekeeperUser.findMany()
// 	console.log(allUsers)
// }

// main()
// 	.catch((e) => {
// 		console.error(e)
// 	})
// 	.finally(async () => {
// 		await prisma.$disconnect()
// 	})
