import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { router, publicProcedure } from './trpc'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './db'
import { registerUserSchema } from 'zodSchemas'
import z from 'zod'
import { TRPCError } from '@trpc/server'
if (process.env.NODE_ENV !== 'production') {
	dotenv.config()
}

const PORT: number = Number(process.env.PORT) || 3000

const appRouter = router({

	registerUser: publicProcedure.input( z
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
		.refine((data) => data.password === data.confirmPassword, {
			message: 'Passwords do not match',
			path: ['confirmPassword'],
		}) )
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
		return {
			user,
		}
	} catch (error) {
		if (error) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'wtf is thissss',
			})

		}
	}
	}),

 

	getUsers: publicProcedure.query(async () => {
		const users = await db.beekeeperUser.findMany()

		const usersArray = users.map((user) => {
			return {
				id: user.id,
				name: user.userName,
				email: user.email,
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
