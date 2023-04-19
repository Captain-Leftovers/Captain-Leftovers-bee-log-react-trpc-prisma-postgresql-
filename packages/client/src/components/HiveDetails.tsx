import { useParams } from 'react-router-dom'
import HiveSvg from './common/HiveSvg'

export default function HiveDetails() {
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
			<div className="grow bg-four">
				<div className="bg-two flex pl-4">
					<button className="rounded-lg bg-five px-4 py-2 text-one transition-colors duration-300 hover:bg-opacity-80">
						add inspection
					</button>
				</div>
                <div className="flex flex-col gap-4 p-4">
                    <p>Hive Data</p>   
                    <p>Hive Data</p>   
                    <p>Hive Data</p>   
                    <p>Hive Data</p>   
                    <p>Hive Data</p>   
                    <p>Hive Data</p>   
                    <p>Hive Data</p>   
                    <p>Hive Data</p>   
                    <p>Hive Data</p>   
                    <p>Hive Data</p>   
                    <p>Hive Data</p>   
                </div>
			</div>
		</div>
	)
}
