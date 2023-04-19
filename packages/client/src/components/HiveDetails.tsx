import { useParams } from 'react-router-dom'
import HiveSvg from './common/HiveSvg'
import ToggleCard from './common/ToggleCard'

// const dummyData: Inspection = {
// 	id: string,
// 	inspectionDate: Date,
// 	updatedAt: Date,
// 	beeEnterExitHive: boolean,
// 	bringingPollen: boolean,
// 	signsOfRobbing: boolean,
// 	animalDisturbing: boolean,
// 	beesCalmOnOpen: boolean,
// 	isBroodPatternGood: boolean,
// 	areLarvaeHealthyWhiteShiny: boolean,
// 	isJellyPresent: boolean,
// 	broodCappedUncappedCells: boolean,
// 	oneEggPerCell: boolean,
// 	antsPresent: boolean,
// 	mothsPresent: boolean,
// 	unusualNumberDeadBees: boolean,
// 	odor: boolean,
// 	tracheal: boolean,
// 	varroa: boolean,
// 	framesCoveredWithBees: number,
// 	framesUsedForBrood: number,
// 	spaceForNectar: boolean,
// 	comments: string,
// 	queenSeen: boolean,
// 	hiveId: string,
// }

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
			<div className="grow bg-four flex flex-col">
				<div className="bg-two flex pl-4">
					<button className="rounded-lg bg-five px-4 py-2 text-one transition-colors duration-300 hover:bg-opacity-80">
						add inspection
					</button>
				</div>
                <div className=" flex flex-col gap-4 p-4 border-orange-900 border-4 grow">
					<ToggleCard/>
					<ToggleCard/>
				</div>
			</div>
		</div>
	)
}
