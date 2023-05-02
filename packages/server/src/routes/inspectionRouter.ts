import { TRPCError } from '@trpc/server'
import { router, protectedProcedure } from '../trpc'

import z from 'zod'
const dateSchema = z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date());
export const inspectionRouter = router({
    //create new inspection
    createNewInspection: protectedProcedure
        .input(
            z.object({
                hiveId: z.string(), 
                inspectionDate:dateSchema ,
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
                        inspectionDate: input.inspectionDate,
                        
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
            
            
        }),
        
        //get last inspection
        getLastInspection: protectedProcedure
        .input(
            z.object({
                hiveId: z.string().nullish(),
            })
        )
        .query(async ({ ctx, input }) => { 
            if(!input.hiveId) throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message:
                    'hiveId is required',
            })

            try {
                const inspection = await ctx.db.inspection.findFirst({
                    where: {
                        hiveId: input.hiveId,
                    },
                    orderBy: {
                        inspectionDate: 'desc',
                    },
                })
                if(!inspection) throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message:
                        'No inspection found',
                })
                
                return inspection 
            } catch (error: any) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message:
                        error?.message ||
                        'Failed to get last inspection',
                })
            }
        }),

        //get all inspections
        getPastInspections: protectedProcedure.input(z.object({
            hiveId: z.string().nullish(),
        }))
        .query(async ({ ctx, input }) => {
            if(!input.hiveId) throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message:
                    'hiveId is required',
            })
            try{
                const inspectionsArr = await ctx.db.inspection.findMany({
                    where: { 
                        hiveId: input.hiveId,
                    },
                    orderBy: {
                        inspectionDate: 'desc',
                    },
                })
                return inspectionsArr
            } catch (error: any) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message:
                        error?.message ||
                        'Failed to get inspections',
                })
            }
        
        })
    


        })