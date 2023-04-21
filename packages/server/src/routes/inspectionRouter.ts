import { TRPCError } from '@trpc/server'
import { router, protectedProcedure } from '../trpc'

import z from 'zod'

export const inspectionRouter = router({
    //create new inspection
    createNewInspection: protectedProcedure
        .input(
            z.object({
                hiveId: z.string(),
                inspectionDate: z.string(),
                beeEnterExitHive: z.boolean(),
                bringingPollen: z.boolean(),
                signsOfRobbing: z.boolean(),
                animalDisturbing: z.boolean(),
                beesCalmOnOpen: z.boolean(),
                isBroodPatternGood: z.boolean(),
                areLarvaeHealthyWhiteShiny: z.boolean(),
                isJellyPresent: z.boolean(),
                broodCappedUncappedCells: z.boolean(),
                oneEggPerCell: z.boolean(),
                antsPresent: z.boolean(),
                mothsPresent: z.boolean(),
                unusualNumberDeadBees: z.boolean(),
                odor: z.boolean(),
                tracheal: z.boolean(),
                varroa: z.boolean(),
                framesCoveredWithBees: z.number(),
                framesUsedForBrood: z.number(),
                spaceForNectar: z.boolean(),
                comments: z.string().max(1000).optional(),
                queenSeen: z.boolean().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {

                const inspection = await ctx.db.inspection.create({
                    data: {
                        ...input,
                        inspectionDate: new Date(input.inspectionDate),
                        
                    }
                })
                return inspection
            } catch (error: any) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message:
                        error?.message ||
                        'Failed to create inspection',
                })
            }
            
            
        })
        })