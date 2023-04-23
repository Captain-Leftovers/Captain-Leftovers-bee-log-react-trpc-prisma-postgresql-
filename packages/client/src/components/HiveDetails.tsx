import { useParams } from 'react-router-dom'
import HiveSvg from './common/HiveSvg'
import { trpc } from '../utils/trpc'
import HiveForm from './HiveForm/HiveForm'



export default function HiveDetails() {
	const createInspectionQ =
		trpc.user.farms.hives.inspections.createNewInspection.useMutation(
			{
				onSuccess: (data) => {
					console.log('success', data)
				},
			}
		)

	const params = useParams()
	const hiveId = params.hiveId
	const hiveNumber = Number(params.hiveNumber)

	

	return (
		<div className="flex h-full bg-six p-2">
			<div className="self-center">
				{!!(hiveId && hiveNumber) && (
					<HiveSvg
						hiveId={hiveId}
						hiveNumber={hiveNumber}
					/>
				)}
			</div>
			<div className="flex grow flex-col bg-four">
				<div className="flex bg-two pl-4">
					<button className="rounded-lg bg-five px-4 py-2 text-one transition-colors duration-300 hover:bg-opacity-80">
						add inspection
					</button>
				</div>
				<div className=" grow  border-4 border-orange-900 p-4 w-full overflow-auto ">
					<HiveForm onSubmitFn={createInspectionQ.mutate} />
				</div>
			</div>
		</div>
	)
}
