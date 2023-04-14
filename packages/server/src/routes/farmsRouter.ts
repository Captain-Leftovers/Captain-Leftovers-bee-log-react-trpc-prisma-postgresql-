import z from 'zod'
import { router, protectedProcedure } from '../trpc'

export const farmsRouter = router({
	//get all farms
	getAllFarms: protectedProcedure.query(async ({ ctx }) => {
		const userFarms = await ctx.db.beeFarm.findMany({
			where: {
				beekeeperUserId: ctx.session.user?.id,
			},
		})

		return userFarms
	}),

	createNewFarm: protectedProcedure
		.input(z.string())
		.mutation(async ({ ctx, input }) => {
			const name = input
			let farm = await ctx.db.beeFarm.create({
				data: {
					beekeeperUserId: ctx.user.id,
					farmName: name,
				},
			})
			return farm
		}),
})
