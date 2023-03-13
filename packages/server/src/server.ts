import { createHTTPServer } from '@trpc/server/adapters/standalone'
import z from 'zod'
import { router, publicProcedure } from './trpc'
import cors from 'cors'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
	dotenv.config()
}

const PORT: number = Number(process.env.PORT) || 3000

const appRouter = router({
	greeting: publicProcedure
		.input(z.object({ name: z.string() }))
		.query((req) => {
			// const { input } = req

			return {
				text: `Hello ${req.input.name}` as const,
			}
		}),

	hello: publicProcedure
		// using zod schema to validate and infer input values
		.input(
			z
				.object({
					text: z.string().nullish(),
				})
				.nullish()
		)
		.query(({ input }) => {
			return {
				greeting: `hello ${input?.text ?? 'world'}`,
			}
		}),

	'': publicProcedure.query(() => {
		return {
			data: 'hello world' as const,
		}
	}),
})

export type AppRouter = typeof appRouter

const { listen, server } = createHTTPServer({
	middleware: cors(),
	router: appRouter,
})
// listen(PORT)
server.listen(PORT, () => {
	console.log(`Server started on \x1b[36m%s\x1b[0m`,`http://localhost:${PORT}`)
})
