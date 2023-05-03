import { useLocation, useNavigate, useParams } from 'react-router-dom'
import HiveSvg from './common/HiveSvg'
import { trpc } from '../utils/trpc'
import HiveForm from './HiveForm/HiveForm'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { InspectionDb } from '../types'

export default function HiveDetails() {
	//TODO :  make upodate inspection to change past inspections and add list of past ones and add new
	//TODO : add delete hive mutation and organazi mobile view
	const [pastInspections, setPastInspections] = useState<InspectionDb[]>(
		[]
	)
	const trpcUtils = trpc.useContext()
	const location = useLocation()
	const navigate = useNavigate()
	const deleteHiveQ = trpc.user.farms.hives.deleteHive.useMutation({
		onSuccess: () => {
			toast('hive deleted')
		},
	})

	const createInspectionQ =
		trpc.user.farms.hives.inspections.createNewInspection.useMutation(
			{
				onSuccess: () => {
					trpcUtils.user.farms.hives.inspections.getLastInspection.refetch(
						{ hiveId }
					)
					trpcUtils.user.farms.hives.inspections.getPastInspections.refetch({hiveId})
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
				enabled: true,
			}
		)
	//TODO : add delete hive mutation and organazi mobile view

	const farmLocation = location.pathname.split('details')[0]
	const deleteHiveHandler = () => {
		if (!hiveId) return
		deleteHiveQ.mutate({ hiveId })
		trpcUtils.user.farms.hives.getFarmhives.refetch().then(() => {
			navigate(farmLocation)
		})
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

				{getPastInspectionsQ.isFetched && (
					<div className=" container p-2">
						<div className="flex gap-10">
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
											<button className="btn-secondary">
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
