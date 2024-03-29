import z from 'zod'
import { TRPCError } from '@trpc/server'
import { router, protectedProcedure } from '../trpc'
import { inspectionRouter } from './inspectionRouter'

export const hivesRouter = router({
	inspections: inspectionRouter,
	//hives
	//get all farms
	getFarmhives: protectedProcedure
		.input(z.object({ beeFarmId: z.string().nullish() }))
		.query(async ({ ctx, input }) => {
			try {
				if (!input.beeFarmId) {
					return []
				}
				const farmHives = await ctx.db.hive.findMany({
					where: {
						beeFarmId: input.beeFarmId,
					},
					orderBy: {
						number: 'asc',
					},
				})
				return farmHives
			} catch (error: any) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message:
						error?.message ||
						'Failed to fetch hives',
				})
			}
		}),

	createNewHive: protectedProcedure
		.input(
			z.object({
				number: z.number().min(1).max(9000),
				beeFarmId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const newHive = await ctx.db.hive.create({
					data: {
						beeFarmId: input.beeFarmId,
						number: input.number,
					},
				})
				return newHive
			} catch (error: any) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message:
						error?.message ||
						'Failed to create hive',
				})
			}
		}),
	deleteHive: protectedProcedure
		.input(
			z.object({
				hiveId: z.string()
			})
		)
		.mutation(async ({ input, ctx }) => {
			try {
				let deletedHive = ctx.db.hive.delete({
					where: {
						id: input.hiveId,
					},
				})
				return deletedHive
			} catch (error: any) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message:
						error?.message ||
						'Failed to delete hive',
				})
			}
		}
		),
})
