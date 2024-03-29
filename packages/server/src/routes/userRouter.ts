import { TRPCError } from '@trpc/server'
import { router } from '../trpc'
import db from '../db'
import { publicProcedure, protectedProcedure } from '../trpc'
import z from 'zod'
import {
	comparePasswords,
	hashPassword,
} from '../services/authService/passwordService'

import { farmsRouter } from './farmsRouter'

type BeekeeperUser = {
	id: string
	userName: string
	email: string
	password: string
	image: string | null
}

export const userRouter = router({
	farms: farmsRouter,
	logoutUser: protectedProcedure.mutation(async ({ ctx }) => {
		return new Promise((resolve, reject) => {
			ctx.session.destroy((err) => {
				if (err) {
					reject(
						new TRPCError({
							code: 'INTERNAL_SERVER_ERROR',
							message: err?.message,
						})
					)
				} else {
					resolve({ success: true })
				}
			})
		})
	}),

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

			try {
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
			} catch (error) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Registration Failed',
				})
			}
		}),

	// getBeekeepers: publicProcedure
	getUsers: publicProcedure.query(async () => {
		try {
			const users = await db.beekeeperUser.findMany()

			const usersArray = users.map((user: BeekeeperUser) => {
				return {
					id: user.id,
					username: user.userName,
					email: user.email,
				}
			})

			return {
				usersArray,
			}
		} catch (err) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Something went wrong',
			})
		}
	}),

	//end of router
})
