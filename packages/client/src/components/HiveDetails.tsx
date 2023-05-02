import { useParams } from 'react-router-dom'
import HiveSvg from './common/HiveSvg'
import { trpc } from '../utils/trpc'
import HiveForm from './HiveForm/HiveForm'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { Inspection } from '../types'
import { InspectionFromDb } from '../types'

export default function HiveDetails() {
	const [pastInspections , setPastInspections] = useState<InspectionFromDb[]>([])
	const trpcUtils = trpc.useContext()
	const createInspectionQ =
		trpc.user.farms.hives.inspections.createNewInspection.useMutation(
			{
				onSuccess: () => {
					trpcUtils.user.farms.hives.inspections.getLastInspection.refetch(
						{ hiveId }
					)
					toast('inspection created')
				},
			}
		)
	const params = useParams()
	const hiveId = params.hiveId
	const hiveNumber = Number(params.hiveNumber)

	const getLastInspectionQ =
		trpc.user.farms.hives.inspections.getLastInspection.useQuery(
			{ hiveId },
			{
				onSuccess: (data) => {
					toast('last inspection loaded')
				},
				enabled: !!hiveId,
				select: (data) => {
					const {
						id,
						inspectionDate,
						updatedAt,
						...rest
					} = data

					return {
						...rest,
						inspectionDate: new Date(
							inspectionDate
						),
					}
				},
				retry: 0,
			}
		)

		const getPastInspectionsQ = trpc.user.farms.hives.inspections.getPastInspections.useQuery({hiveId}, {
			
			select: (data) => {
				const dataArr = data.map((inspection)=>{
					let {id, inspectionDate, updatedAt, ...rest} = inspection
					return { 	...rest,
						inspectionDate: new Date(
							inspectionDate
						),}
				})
				return dataArr
			},
				

			onSuccess: () => {
				
				toast('past inspections loaded')
			},
			enabled: false,

		})
	//TODO : add delete hive mutation and organazi mobile view
	const getPastInspectionsHandler = ()=>{ 
		
	}
	return (
		<div className="flex flex-col p-2   ">
			<div className=" flex   justify-evenly ">
					<button onClick={getPastInspectionsHandler} className="btn-secondary self-center">
						list inspections
					</button>
				<div className="">
					{!!(hiveId && hiveNumber) && (
						<HiveSvg
							hiveId={hiveId}
							hiveNumber={hiveNumber}
						/>
					)}
				</div>
				<button className="btn-secondary self-center ">
					Delete Hive
				</button>createInspectionQ
			
				<div className="  grow  p-4 ">
					{getLastInspectionQ.isFetched && (
						<HiveForm
							onSubmitFn={
								createInspectionQ.mutate
							}
							initial={
								getLastInspectionQ.data
							}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
