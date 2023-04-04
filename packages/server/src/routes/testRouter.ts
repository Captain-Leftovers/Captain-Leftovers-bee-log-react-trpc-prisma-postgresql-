import { publicProcedure, router } from '../trpc'

export const testRouter = router({
	test: publicProcedure.query(() => {
		return {
			message: 'Hello World from TRPC',
		}
	}),
})
