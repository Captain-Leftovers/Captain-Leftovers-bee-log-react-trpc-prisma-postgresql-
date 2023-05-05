import { useLocation, useNavigate, useParams } from 'react-router-dom'
import HiveSvg from './common/HiveSvg'
import { trpc } from '../utils/trpc'
import HiveForm from './HiveForm/HiveForm'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { InspectionDb, SubmitInspection } from '../types'

export default function HiveDetails() {
	//TODO :  make upodate inspection to change past inspections and add list of past ones and add new
	//TODO : add delete hive mutation and organazi mobile view
	const [pastInspections, setPastInspections] = useState<InspectionDb[]>(
		[]
	)
	const [selectedInspection, setSelectedInspection] =
		useState<InspectionDb | null>(null)
	const trpcUtils = trpc.useContext()
	const location = useLocation()
	const navigate = useNavigate()
	const deleteHiveQ = trpc.user.farms.hives.deleteHive.useMutation({
		onSuccess: () => {
			toast('hive deleted')
		},
	})

	const updateInspectionQ = trpc.user.farms.hives.inspections.updateInspection.useMutation(
		{
			onSuccess: () => {
				trpcUtils.user.farms.hives.inspections.getLastInspection.refetch(
					{ hiveId }
				)
				trpcUtils.user.farms.hives.inspections.getPastInspections.refetch(
					{ hiveId }
				)
				toast('inspection updated')
			},
		}
	)


	const createInspectionQ =
		trpc.user.farms.hives.inspections.createNewInspection.useMutation(
			{
				onSuccess: () => {
					trpcUtils.user.farms.hives.inspections.getLastInspection.refetch(
						{ hiveId }
					)
					trpcUtils.user.farms.hives.inspections.getPastInspections.refetch(
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
				onSuccess: () => {
					trpcUtils.user.farms.hives.inspections.getPastInspections.refetch(
						{ hiveId }
					)
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
						),
					}
				},
				retry: 0,
			}
		)

	const getPastInspectionsQ =
		trpc.user.farms.hives.inspections.getPastInspections.useQuery(
			{ hiveId },
			{
				select: (data) => {
					const dataArr = data.map(
						(inspection) => {
							let {
								id,
								inspectionDate,
								updatedAt,
								...rest
							} = inspection
							return {
								...rest,
								id: id,
								inspectionDate:
									inspectionDate,
							}
						}
					)
					return dataArr
				},

				onSuccess: () => {
					if (!getPastInspectionsQ.data) return
					setPastInspections(
						getPastInspectionsQ.data
					)
				},
				enabled: !!hiveId,
			}
		)

	const farmLocation = location.pathname.split('details')[0]
	const deleteHiveHandler = () => {
		if (!hiveId) return
		deleteHiveQ.mutate({ hiveId })
		trpcUtils.user.farms.hives.getFarmhives.refetch().then(() => {
			navigate(farmLocation)
		})
	}

	const getSelectedInspection = (inspectionId: string) => {
		const selectedInspection = pastInspections.find(
			(inspection) => inspection.id === inspectionId
		)
		

		if (!selectedInspection) return
		setSelectedInspection(selectedInspection)
		
	}

	
	const submitHandler = (data:SubmitInspection, action:'create' | 'update') => {
	
		if (action === 'create') {
			createInspectionQ.mutate(data)
		}
		if (action === 'update') {
			updateInspectionQ.mutate(data)
		}
	}
	return (
		<div className="flex h-full  p-2 ">
			<div className="w-full ">
				<div className="flex justify-evenly">
					{!!(hiveId && hiveNumber) && (
						<HiveSvg
							hiveId={hiveId}
							hiveNumber={hiveNumber}
						/>
					)}
					<button
						onClick={deleteHiveHandler}
						className="btn-secondary self-center "
					>
						Delete Hive
					</button>
				</div>

				{getPastInspectionsQ.data && (
					<div className=" container p-2">
						<div className="flex justify-start gap-8 overflow-x-auto">
							{pastInspections.map(
								(
									inspection
								) => {
									return (
										<div
											key={
												inspection.id
											}
											className=""
										>
											<button
												onClick={() =>
													getSelectedInspection(
														inspection.id
													)
												}
												className="btn-secondary whitespace-nowrap"
											>
												{
													inspection.inspectionDate.split(
														'T'
													)[0]
												}
											</button>
										</div>
									)
								}
							)}
						</div>
					</div>
				)}

				<div className="">
					{getLastInspectionQ.isFetched && (
						<HiveForm
							onSubmitAction={
								submitHandler
							}
							initial={
								selectedInspection ? {... selectedInspection, inspectionDate: new Date(selectedInspection.inspectionDate) } : getLastInspectionQ.data
								
							}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

