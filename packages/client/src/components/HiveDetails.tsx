import { useLocation, useNavigate, useParams } from 'react-router-dom'
import HiveSvg from './common/HiveSvg'
import { trpc } from '../utils/trpc'
import HiveForm from './HiveForm/HiveForm'
import { toast } from 'react-hot-toast'
import { useRef, useState } from 'react'
import { InspectionDb, SubmitInspection } from '../types'

export default function HiveDetails() {
	const [selectedButton, setSelectedButton] = useState<string | null>(null);
	
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

	const updateInspectionQ =
		trpc.user.farms.hives.inspections.updateInspection.useMutation({
			onSuccess: () => {
				trpcUtils.user.farms.hives.inspections.getLastInspection.refetch(
					{ hiveId }
				)
				trpcUtils.user.farms.hives.inspections.getPastInspections.refetch(
					{ hiveId }
				)
				setSelectedInspection(null)

				toast('inspection updated')
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
					trpcUtils.user.farms.hives.inspections.getPastInspections.refetch(
						{ hiveId }
					)
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
						inspectionDate: new Date(),
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


	const getSelectedInspection = ( inspectionId: string) => {

		
		const selectedInspection = pastInspections.find(
			(inspection) => inspection.id === inspectionId
		)

		if (!selectedInspection) return
		setSelectedInspection(selectedInspection)
	}

	const hiveDetailsRef = useRef<HTMLDivElement>(null)

	const scrollFn = ()=>{
		
		if(!hiveDetailsRef.current) {toast('no ref current') 
		return}
		hiveDetailsRef.current.scrollIntoView({behavior:'smooth'})
		
	}

	const submitHandler = (
		data: SubmitInspection,
		action: 'create' | 'update'
	) => {
		if (action === 'create') {
			createInspectionQ.mutate(data)
		}
		if (action === 'update') {
			if (!data.id || data.id === undefined) return
			updateInspectionQ.mutate(data)
		}
	}

	const handleButtonSelection = (buttonName:string) => {
		
		setSelectedButton(buttonName);
	  };
	return (
		<div 
		ref = {hiveDetailsRef}
		className="flex h-full  p-2 ">
			<div className="w-full ">
				<div className="flex justify-evenly">
				<button
					onClick={()=> {
						handleButtonSelection('newInspection')
						setSelectedInspection(null) 
				 trpcUtils.user.farms.hives.inspections.getPastInspections.refetch({hiveId})
				 }}
					className={` ${
						selectedButton === 'newInspection' ? 'text-three' : 'text-one'
					  } btn-third self-center`}
				>
					new inspection
				</button>
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
					<div className=" container  my-2 ">
						<div className="flex justify-start gap-6 overflow-x-auto p-4">
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
												onClick={(e) =>{
													handleButtonSelection(inspection.id)
													getSelectedInspection(
														inspection.id
														)
													}
												}
												className={` ${selectedButton === inspection.id ? 'text-three' : 'text-one'} btn-third whitespace-nowrap`}
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

				<div className="overflow-auto">
					{getLastInspectionQ.isFetched && (
						<HiveForm
							scrollFn={scrollFn}
							onSubmitAction={
								submitHandler
							}
							initial={
								selectedInspection
									? {
											...selectedInspection,
											inspectionDate:
												new Date(
													selectedInspection.inspectionDate
												),
									  }
									: getLastInspectionQ.data
							}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
