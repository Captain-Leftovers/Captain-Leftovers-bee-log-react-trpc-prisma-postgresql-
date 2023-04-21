import { publicProcedure, router } from '../trpc'
import { testRouter } from './testRouter'
import { userRouter } from './userRouter'

export const MainRouter = router({
	checkIsAuthed: publicProcedure.query(() => {
		return 'wtf authed backend'
	}),
	test: testRouter,
	user: userRouter,
	
})
