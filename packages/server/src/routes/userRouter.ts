import { TRPCError } from '@trpc/server'
import { router } from '../trpc'
import db from '../db'
import { publicProcedure } from '../trpc'
import z from 'zod'
import {
	comparePasswords,
	hashPassword,
} from '../services/authService/passwordService'

export const userRouter = router({
	//login user
	loginUser: publicProcedure
		.input(
			z.object({
				email: z.string().email().min(3),
				password: z
					.string()
					.min(6)
					.max(24)
					.regex(
						/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,24}$/
					),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const { email, password } = input
			try {
				const user = await db.beekeeperUser.findUnique({
					where: {
						email,
					},
				})

				if (!user) {
					throw new TRPCError({
						code: 'NOT_FOUND',
						message: 'User does not exist',
					})
				}

				const isPasswordCorrect =
					await comparePasswords(
						password,
						user.password
					)

				if (!isPasswordCorrect) {
					throw new TRPCError({
						code: 'UNAUTHORIZED',
						message: 'Incorrect password',
					})
				}

				const currentUser = {
					id: user.id,
					username: user.userName,
					email: user.email,
				}

				ctx.session.user = currentUser

				return { currentUser }
			} catch (error: any) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: error?.message,
				})
			}
		}),

	//register user
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
		.mutation(async ({ input, ctx }) => {
			const { userName, email, password } = input

			const hashedPassword = await hashPassword(password)

			const user = await db.beekeeperUser.create({
				data: {
					userName,
					email,
					password: hashedPassword,
				},
			})

			const currentUser = {
				id: user.id,
				username: user.userName,
				email: user.email,
			}
			ctx.session.user = currentUser

			return {
				currentUser,
			}
		}),

	// getBeekeepers: publicProcedure
	getUsers: publicProcedure.query(async () => {
		const users = await db.beekeeperUser.findMany()

		const usersArray = users.map((user) => {
			return {
				id: user.id,
				username: user.userName,
				email: user.email,
			}
		})

		return {
			usersArray,
		}
	}),


	//end of router
})

