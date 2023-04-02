import { router, publicProcedure } from './trpc'
import db from './db'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import z from 'zod'

export const MainRouter = router({
	'': publicProcedure.query(() => {
		return {
			message: 'Hello World from TRPC',
		}
	}),

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
				email: user.email,
			}
		})

		return {
			usersArray,
		}
	}),

	
})
