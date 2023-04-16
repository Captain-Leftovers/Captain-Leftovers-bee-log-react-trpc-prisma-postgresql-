import z from 'zod'
import { TRPCError } from '@trpc/server'
import { router, protectedProcedure } from '../trpc'
import { hivesRouter } from './hivesRouter'

export const farmsRouter = router({
  //hives
  hives: hivesRouter,
  //get all farms
  getAllFarms: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userFarms = await ctx.db.beeFarm.findMany({
        where: {
          beekeeperUserId: ctx.session.user?.id,
        },
      })

      return userFarms
    } catch (error: any) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to fetch farms',
      })
    }
  }),

  createNewFarm: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const name = input
      try {
        let farm = await ctx.db.beeFarm.create({
          data: {
            beekeeperUserId: ctx.user.id,
            farmName: name,
          },
        })
        return farm
      } catch (error: any) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to create farm',
        })
      }
    }),

  deleteFarm: protectedProcedure
    .input(
      z.object({
        farmId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        let deletedFarm = ctx.db.beeFarm.delete({
          where: {
            id: input.farmId,
          },
        })
        return deletedFarm
      } catch (error: any) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to delete farm',
        })
      }
    }),
})
