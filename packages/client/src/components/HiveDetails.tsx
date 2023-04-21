import { useParams } from 'react-router-dom'
import HiveSvg from './common/HiveSvg'
import ToggleCard from './common/ToggleCard'
import { useState } from 'react'
import { Inspection } from '../types'
import { trpc } from '../utils/trpc'

const initialData: Inspection = {
	inspectionDate: new Date(Date.now()).toISOString(),
	beeEnterExitHive: true,
	bringingPollen: true,
	signsOfRobbing: false,
	animalDisturbing: false,
	beesCalmOnOpen: true,
	isBroodPatternGood: true,
	areLarvaeHealthyWhiteShiny: true,
	isJellyPresent: true,
	broodCappedUncappedCells: true,
	oneEggPerCell: true,
	antsPresent: false,
	mothsPresent: false,
	unusualNumberDeadBees: false,
	odor: false,
	tracheal: false,
	varroa: false,
	framesCoveredWithBees: 0,
	framesUsedForBrood: 0,
	spaceForNectar: true,
	comments: '',
	queenSeen: false,
}

export default function HiveDetails() {
	const [inspection, setInspection] = useState<Inspection>(initialData)
	const createInspectionQ = trpc.user.farms.hives.inspections.createNewInspection.useMutation(
		{
			onSuccess: (data) => {
				console.log('success', data)
			},
		
		}
	)


	const params = useParams()
	const hiveId = params.hiveId
	const hiveNumber = Number(params.hiveNumber)

	const submitInspectionHandler = (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault()
		if(!hiveId){return}
		
		createInspectionQ.mutate({...inspection, hiveId: hiveId})
	}

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
				<div className=" grow  border-4 border-orange-900 p-4 ">
					<form
						action="POST"
						className="mx-auto flex max-w-3xl flex-col"
						onSubmit={
							submitInspectionHandler
						}
					>
						<div className="flex  h-[500px] flex-col flex-wrap  gap-4 ">
							<div>
								<label htmlFor="inspectionDate">
									inspectionDate
								</label>
								<input
									type="date"
									defaultValue={inspection.inspectionDate.slice(0, 10)}
									name="inspectionDate"
									id="inspectionDate"
								/>
							</div>
							<div>
								<label htmlFor="beeEnterExitHive">
									beeEnterExitHive
								</label>
								<input
									defaultChecked={
										inspection.beeEnterExitHive
									}
									type="checkbox"
									name="beeEnterExitHive"
									id="beeEnterExitHive"
								/>
							</div>
							<div>
								<label htmlFor="bringingPollen">
									bringingPollen
								</label>
								<input
									defaultChecked={
										inspection.bringingPollen
									}
									type="checkbox"
									name="bringingPollen"
									id="bringingPollen"
								/>
							</div>
							<div>
								<label htmlFor="signsOfRobbing">
									signsOfRobbing
								</label>
								<input
									defaultChecked={
										inspection.signsOfRobbing
									}
									type="checkbox"
									name="signsOfRobbing"
									id="signsOfRobbing"
								/>
							</div>
							<div>
								<label htmlFor="animalDisturbing">
									animalDisturbing
								</label>
								<input
									defaultChecked={
										inspection.animalDisturbing
									}
									type="checkbox"
									name="animalDisturbing"
									id="animalDisturbing"
								/>
							</div>
							<div>
								<label htmlFor="beesCalmOnOpen">
									beesCalmOnOpen
								</label>
								<input
									defaultChecked={
										inspection.beesCalmOnOpen
									}
									type="checkbox"
									name="beesCalmOnOpen"
									id="beesCalmOnOpen"
								/>
							</div>
							<div>
								<label htmlFor="isBroodPatternGood">
									isBroodPatternGood
								</label>
								<input
									defaultChecked={
										inspection.isBroodPatternGood
									}
									type="checkbox"
									name="isBroodPatternGood"
									id="isBroodPatternGood"
								/>
							</div>
							<div>
								<label htmlFor="areLarvaeHealthyWhiteShiny">
									areLarvaeHealthyWhiteShiny
								</label>
								<input
									defaultChecked={
										inspection.areLarvaeHealthyWhiteShiny
									}
									type="checkbox"
									name="areLarvaeHealthyWhiteShiny"
									id="areLarvaeHealthyWhiteShiny"
								/>
							</div>
							<div>
								<label htmlFor="isJellyPresent">
									isJellyPresent
								</label>
								<input
									defaultChecked={
										inspection.isJellyPresent
									}
									type="checkbox"
									name="isJellyPresent"
									id="isJellyPresent"
								/>
							</div>
							<div>
								<label htmlFor="broodCappedUncappedCells">
									broodCappedUncappedCells
								</label>
								<input
									defaultChecked={
										inspection.broodCappedUncappedCells
									}
									type="checkbox"
									name="broodCappedUncappedCells"
									id="broodCappedUncappedCells"
								/>
							</div>
							<div>
								<label htmlFor="oneEggPerCell">
									oneEggPerCell
								</label>
								<input
									defaultChecked={
										inspection.oneEggPerCell
									}
									type="checkbox"
									name="oneEggPerCell"
									id="oneEggPerCell"
								/>
							</div>
							<div>
								<label htmlFor="antsPresent">
									antsPresent
								</label>
								<input
									defaultChecked={
										inspection.antsPresent
									}
									type="checkbox"
									name="antsPresent"
									id="antsPresent"
								/>
							</div>
							<div>
								<label htmlFor="mothsPresent">
									mothsPresent
								</label>
								<input
									defaultChecked={
										inspection.mothsPresent
									}
									type="checkbox"
									name="mothsPresent"
									id="mothsPresent"
								/>
							</div>
							<div>
								<label htmlFor="unusualNumberDeadBees">
									unusualNumberDeadBees
								</label>
								<input
									defaultChecked={
										inspection.unusualNumberDeadBees
									}
									type="checkbox"
									name="unusualNumberDeadBees"
									id="unusualNumberDeadBees"
								/>
							</div>
							<div>
								<label htmlFor="odor">
									odor
								</label>
								<input
									defaultChecked={
										inspection.odor
									}
									type="checkbox"
									name="odor"
									id="odor"
								/>
							</div>
							<div>
								<label htmlFor="tracheal">
									tracheal
								</label>
								<input
									defaultChecked={
										inspection.tracheal
									}
									type="checkbox"
									name="tracheal"
									id="tracheal"
								/>
							</div>
							<div>
								<label htmlFor="varroa">
									varroa
								</label>
								<input
									defaultChecked={
										inspection.varroa
									}
									type="checkbox"
									name="varroa"
									id="varroa"
								/>
							</div>
							<div>
								<label htmlFor="spaceForNectar">
									spaceForNectar
								</label>
								<input
									defaultChecked={
										inspection.spaceForNectar
									}
									type="checkbox"
									name="spaceForNectar"
									id="spaceForNectar"
								/>
							</div>
							<div>
								<label htmlFor="queenSeen">
									queenSeen
								</label>
								<input
									defaultChecked={
										inspection.queenSeen
									}
									type="checkbox"
									name="queenSeen"
									id="queenSeen"
								/>
							</div>
							<div>
								<label htmlFor="framesCoveredWithBees">
									framesCoveredWithBees
								</label>
								<input
									defaultValue={
										inspection.framesCoveredWithBees
									}
									type="number"
									name="framesCoveredWithBees"
									id="framesCoveredWithBees"
								/>
							</div>
							<div>
								<label htmlFor="framesUsedForBrood">
									framesUsedForBrood
								</label>
								<input
									defaultValue={
										inspection.framesUsedForBrood
									}
									type="number"
									name="framesUsedForBrood"
									id="framesUsedForBrood"
								/>
							</div>
							<div>
								<label htmlFor="comments">
									cflex-colomments
								</label>
								<input
									defaultValue={
										inspection.comments
									}
									type="text"
									name="comments"
									id="comments"
								/>
							</div>
						</div>
						<button
							className="bg-two"
							type="submit"
						>
							Update Inspection
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
