import { Prisma } from '@prisma/client'
import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import db from './db'
import { ZodError } from 'zod'
import { Session } from 'express-session'
import { SessionData } from 'types'

// created for each request
export const createContext = async ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => ({
	db: db,
	session: req.session as Session & Partial<SessionData>,
	req,
	res,
})

type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create({
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.code === 'BAD_REQUEST' &&
					error.cause instanceof ZodError
						? error.cause.flatten()
						: null,
				prismaError:
					error.code ===
						'INTERNAL_SERVER_ERROR' &&
					error.cause instanceof
						Prisma.PrismaClientKnownRequestError
						? error.cause
						: null,
			},
		}
	},
})

export const middleware = t.middleware

//TODO : start HEREE this is not working maybe see if it needs to be some other method not middleware maybe express middleware
// const isAuthenticated = middleware<Context>(async ({ ctx, next }) => {
//   if (!ctx.session.user) {
//     throw new Error('Unauthorized');
//   }
//   return next();
// });

export const publicProcedure = t.procedure

export const router = t.router
