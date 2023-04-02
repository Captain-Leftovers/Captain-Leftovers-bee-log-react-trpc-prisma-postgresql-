import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { router, publicProcedure } from './trpc'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './db'
import z from 'zod'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import session from 'express-session'



if (process.env.NODE_ENV !== 'production') {
	dotenv.config()
}

const PORT: number = Number(process.env.PORT) || 3000

const appRouter = router({
	registerUser: publicProcedure
		.input(
			z
				.object({
					userName: z
						.string()
						.min(3)
						.max(20)
						.regex(/^[a-zA-Z0-9_]+$/),
					email: z.string().email().min(3),
					password: z
						.string()
						.min(6)
						.max(24)
						.regex(
							/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,24}$/
						),
					confirmPassword: z
						.string()
						.min(6)
						.max(24)
						.regex(
							/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,24}$/
						),
				})
				.refine(
					(data) =>
						data.password ===
						data.confirmPassword,
					{
						message: 'Passwords do not match',
						path: ['confirmPassword'],
					}
				)
		)
		.mutation(async ({ input }) => {
			const { userName, email, password } = input
			try {
				const user = await db.beekeeperUser.create({
					data: {
						userName,
						email,
						password,
					},
				})
				
				const currentUser = {
					id: user.id,
					name: user.userName,
					email: user.email,
				}

				return {
					currentUser,
				}
			} catch (error) {
				if (error) {
					const prismaError =
						error as Prisma.PrismaClientKnownRequestError
					if (prismaError.code === 'P2002') {
						const target = prismaError.meta
							?.target as string
						const field = target
							.toString()
							.toLowerCase()
						throw new TRPCError({
							code: 'CONFLICT',
							message: `${field} already exists`,
						})
					}
				}
			}
		}),

	getUsers: publicProcedure.query(async () => {
		const users = await db.beekeeperUser.findMany()

		const usersArray = users.map((user) => {
			return {
				id: user.id,
				name: user.userName,
				email: user.email,app.use(
					expressSession({
					  cookie: {
					   maxAge: 7 * 24 * 60 * 60 * 1000 // ms
					  },
					  secret: 'a santa at nasa',
					  resave: true,
					  saveUninitialized: true,
					  store: new PrismaSessionStore(
						new PrismaClient(),
						{
						  checkPeriod: 2 * 60 * 1000,  //ms
						  dbRecordIdIsSessionId: true,
						  dbRecordIdFunction: undefined,
						}
					  )
					})
				  );
			}
		})

		return {
			usersArray,
		}
	}),

	'': publicProcedure.query(() => {
		return {
			data: 'hello world' as const,
		}
	}),
})

export type AppRouter = typeof appRouter

const { listen, server } = createHTTPServer({
	middleware: cors(),
	router: appRouter,
	
})
// listen(PORT)
server.listen(PORT, () => {
	console.log(
		`Server started on \x1b[36m%s\x1b[0m`,
		`http://localhost:${PORT}`
	)
})
