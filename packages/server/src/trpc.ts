import { Prisma } from '@prisma/client';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { ZodError } from 'zod';


// created for each request
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create(
  {
    errorFormatter({shape,error}) {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
              ? error.cause.flatten()
              : null,
          prismaError:
            error.code === 'INTERNAL_SERVER_ERROR' && error.cause instanceof Prisma.PrismaClientKnownRequestError
              ? error.cause
              : null,
        },
      };
    }
  }

);
export const publicProcedure = t.procedure
export const router = t.router




