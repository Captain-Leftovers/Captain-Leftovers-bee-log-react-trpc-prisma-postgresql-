import z from 'zod'
import { TRPCError } from '@trpc/server'
import { router, protectedProcedure } from '../trpc'

export const hivesRouter = router({
    //hives
  //get all farms
  getFarmhives: protectedProcedure.input(z.object({beeFarmId: z.string().nullish()})).query(async ({ ctx, input }) => {
    try {
      if(!input.beeFarmId) { return  []}
      const farmHives = await ctx.db.hive.findMany({
        where: {
            beeFarmId: input.beeFarmId
          } , 
        } )
        return farmHives  
     



    }  catch (error: any) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to fetch hives',
      }) 
    } 
  }),

//   createNewFarm: protectedProcedure
//     .input(z.string())
//     .mutation(async ({ ctx, input }) => {
//       const name = input
//       try {
//         let farm = await ctx.db.beeFarm.create({
//           data: {
//             beekeeperUserId: ctx.user.id,
//             farmName: name,
//           },
//         })
//         return farm
//       } catch (error: any) {
//         throw new TRPCError({
//           code: 'INTERNAL_SERVER_ERROR',
//           message: error?.message || 'Failed to create farm',
//         })
//       }
//     }),

//   deleteFarm: protectedProcedure
//     .input(
//       z.object({
//         farmId: z.string(),
//       })
//     )
//     .mutation(async ({ input, ctx }) => {
//       try {
//         let deletedFarm = ctx.db.beeFarm.delete({
//           where: {
//             id: input.farmId,
//           },
//         })
//         return deletedFarm
//       } catch (error: any) {
//         throw new TRPCError({
//           code: 'INTERNAL_SERVER_ERROR',
//           message: error?.message || 'Failed to delete farm',
//         })
//       }
//     }),
})
