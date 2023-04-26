import { useParams } from 'react-router-dom'
import HiveSvg from './common/HiveSvg'
import { trpc } from '../utils/trpc'
import HiveForm from './HiveForm/HiveForm'
import { toast } from 'react-hot-toast'

export default function HiveDetails() {
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

	return (
		<div className="flex h-full bg-six p-2">
			<div className='bg-yellow-200 flex flex-col gap-10 justify-center'>
				<button className=''>DELETE</button>

				<div className="self-center   ">
					{!!(hiveId && hiveNumber) && (
						<HiveSvg
							hiveId={hiveId}
							hiveNumber={hiveNumber}
						/>
					)}
				</div>
				<button className='text-five font-bold hover:text-opacity-80'>Delete<br/>Hive</button>

			</div>
			<div className="flex grow flex-col bg-four">
				<div className="flex bg-two pl-4">
					<button className="rounded-lg bg-five px-4 py-2 text-one transition-colors duration-300 hover:bg-opacity-80">
						add inspection
					</button>
				</div>
				<div className=" w-full  grow overflow-auto border-4 border-orange-900 p-4 ">
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
