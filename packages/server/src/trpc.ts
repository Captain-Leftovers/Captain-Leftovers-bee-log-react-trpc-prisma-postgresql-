import { Prisma } from '@prisma/client'
import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server'
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

const isAuthed = middleware(({ next, ctx }) => {
	if (!ctx.session.user) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Please login first',
		})
	}
	return next({
		ctx: {
			user: ctx.session.user,
		},
	})
})
// you can reuse this for any procedure
export const protectedProcedure = t.procedure.use(isAuthed)
export const publicProcedure = t.procedure

export const router = t.router
