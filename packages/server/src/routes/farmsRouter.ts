import { router, protectedProcedure } from '../trpc'

export const farmsRouter = router({
	//get all farms
	getAllFarms: protectedProcedure.query(async ({ ctx }) => {
	
		const userFarms = await ctx.db.beeFarm.findMany({
			where: {
				
				beekeeperUserId : ctx.session.user?.id,
			},
		})
		
		return userFarms
	}),
})