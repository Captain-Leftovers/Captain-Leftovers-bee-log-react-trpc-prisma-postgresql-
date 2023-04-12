import { useParams } from 'react-router-dom'

export default function UserDetails() {
	const userID = useParams().id

	//TODO : get farms from db and display them

	const farmName = undefined || 'no farm selected'

	return (
		<div className="flex h-full flex-col items-center gap-4 bg-six p-4 ">
			<div className="min-w-[150px] self-center bg-five px-2 py-1 text-center hover:bg-opacity-80  ">
				<button className="  ">choose farm</button>
			</div>

			<h1 className="text-3xl">{farmName}</h1>
		</div>
	)
}
