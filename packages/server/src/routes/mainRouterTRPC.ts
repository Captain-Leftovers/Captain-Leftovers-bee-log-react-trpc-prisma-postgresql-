import { publicProcedure, router } from '../trpc'
import { testRouter } from './testRouter'
import { userRouter } from './userRouter'

export const MainRouter = router({
	test: testRouter,
	user: userRouter,
	
})
