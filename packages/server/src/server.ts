import express from 'express'
import expressSession from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import cors from 'cors'
import dotenv from 'dotenv'
import { MainRouter } from './routes/mainRouterTRPC'
import * as trpcExpress from '@trpc/server/adapters/express'
import { createContext } from './trpc'
import db from './db'

if (process.env.NODE_ENV !== 'production') {
	dotenv.config()
}

const PORT: number = Number(process.env.PORT) || 3000

const appRouter = MainRouter

export type AppRouter = typeof appRouter

const app = express()

app.use(
	cors({
		origin: [
			'https://captain-leftovers-bee-log-react-trpc-prisma-postgresql-client.vercel.app',
			'https://www.beekeeperslog.com',
			'https://beekeeperslog.com',
			'https://master--visionary-travesseiro-e25380.netlify.app/',
			'https://master--visionary-travesseiro-e25380.netlify.app',
		],
		credentials: true,
	})
)

app.use(
	expressSession({
		proxy: true,
		cookie: {
			sameSite: 'none',

			httpOnly: true,
			secure: true,
			maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
		},
		secret: `${process.env.SESSION_SECRET}`,
		resave: true,
		saveUninitialized: true,
		store: new PrismaSessionStore(db, {
			checkPeriod: 2 * 60 * 1000, //2 minutes
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	})
)

app.use(
	'/trpc',
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
	})
)

app.listen(PORT, () => {
	console.log(
		`Server started on \x1b[36m%s\x1b[0m`,
		`http://localhost:${PORT}`
	)
})

export default app
