import { createHTTPServer } from '@trpc/server/adapters/standalone'
import z from 'zod'
import { router, publicProcedure } from './trpc'
import cors from 'cors'
import * as trpc from '@trpc/server';
import http from 'http';


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
			.nullish(),
		)
		.query(({ input }) => {
		  return {
			greeting: `hello ${input?.text ?? 'world'}`,
		  };
		}),

	'': publicProcedure.query(() => {
		return {
			data: 'hello world' as const,
		}
	}),
})

export type AppRouter = typeof appRouter

const { listen } = createHTTPServer({
	middleware:cors(),
	router: appRouter,
	
})
// The API will now be listening on port 3000!
listen(3000)
