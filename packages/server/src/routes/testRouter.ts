import { publicProcedure, router } from '../trpc'

export const testRouter = router({
	test: publicProcedure.query(async ({ ctx }) => {
		let testUser = await ctx.db.beekeeperUser.findFirst({
			where: {
				userName: {
					equals: 'Guest',
				},
			},
			select: { userName: true },
		})
		return {
			message: `Hello ${testUser?.userName}!`,
		}
	}),
})
