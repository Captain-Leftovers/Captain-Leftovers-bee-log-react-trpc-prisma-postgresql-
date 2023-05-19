import { publicProcedure, router } from '../trpc'

export const testRouter = router({
	test: publicProcedure.query(({}) => {
		// let ctxJ = JSON.stringify(ctx.session.user)
		return {
			message: ` test trpc route here`,
		}
	}),
})
