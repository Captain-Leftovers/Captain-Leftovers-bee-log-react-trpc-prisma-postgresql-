import { useReducer } from 'react'
import { hiveFormReducer, initialState } from './hiveFormReducer'
import { formatDateForInput } from '../../utils/commonUtils'
import {  SubmitInspection } from '../../types'
import { useParams } from 'react-router-dom'

export default function HiveForm({
	onSubmitFn,
}: {
	onSubmitFn: (data: SubmitInspection) => void
}) {
	const [state, dispatch] = useReducer(hiveFormReducer, initialState)

	const params = useParams()
	const hiveId = params.hiveId

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target

		if (type === 'checkbox') {
			dispatch({
				type: 'UPDATE_CHECKBOX',
				payload: {
					[name]: checked,
				},
			})
		}
		if (type === 'number' || type === 'text') {
			dispatch({
				type: 'CHANGE_INPUT',
				payload: {
					[name]: value,
				},
			})
		}
		if (type === 'date') {
			dispatch({
				type: 'CHANGE_DATE',
				payload: {
					[name]: new Date(value),
				},
			})
		}
	}

	const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(state)
		if(!hiveId) return
		onSubmitFn({...state, hiveId })

		//TODO : the date on the backedn is agai day early
	}

	return (
		<form
			onSubmit={submitFormHandler}
			action="POST"
			className="mx-auto flex  flex-col flex-wrap"
		>
			<p> iso{state.inspectionDate.toISOString()}</p>
			<p>local {state.inspectionDate.toLocaleString()}</p>
			<p>func {formatDateForInput(state.inspectionDate)}</p>
			<p>
				newDateFromFn{' '}
				{new Date(
					formatDateForInput(state.inspectionDate)
				).toISOString()}{' '}
			</p>
			<div className="mx-auto pb-2">
				<label htmlFor="inspectionDate">
					inspectionDate
				</label>
				<input
					onChange={changeHandler}
					type="date"
					value={formatDateForInput(
						state.inspectionDate
					)}
					name="inspectionDate"
					id="inspectionDate"
				/>
			</div>
			<div className="flex  flex-wrap gap-y-4 pb-4 ">
				<div className="basis-1/3 ">
					<label htmlFor="beeEnterExitHive">
						beeEnterExitHive
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={
							state.beeEnterExitHive
						}
						type="checkbox"
						name="beeEnterExitHive"
						id="beeEnterExitHive"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="bringingPollen">
						bringingPollen
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={
							state.bringingPollen
						}
						type="checkbox"
						name="bringingPollen"
						id="bringingPollen"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="signsOfRobbing">
						signsOfRobbing
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={
							state.signsOfRobbing
						}
						type="checkbox"
						name="signsOfRobbing"
						id="signsOfRobbing"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="animalDisturbing">
						animalDisturbing
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={
							state.animalDisturbing
						}
						type="checkbox"
						name="animalDisturbing"
						id="animalDisturbing"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="beesCalmOnOpen">
						beesCalmOnOpen
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={
							state.beesCalmOnOpen
						}
						type="checkbox"
						name="beesCalmOnOpen"
						id="beesCalmOnOpen"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="isBroodPatternGood">
						isBroodPatternGood
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={
							state.isBroodPatternGood
						}
						type="checkbox"
						name="isBroodPatternGood"
						id="isBroodPatternGood"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="areLarvaeHealthyWhiteShiny">
						areLarvaeHealthyWhiteShiny
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={
							state.areLarvaeHealthyWhiteShiny
						}
						type="checkbox"
						name="areLarvaeHealthyWhiteShiny"
						id="areLarvaeHealthyWhiteShiny"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="isJellyPresent">
						isJellyPresent
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={
							state.isJellyPresent
						}
						type="checkbox"
						name="isJellyPresent"
						id="isJellyPresent"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="broodCappedUncappedCells">
						broodCappedUncappedCells
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={
							state.broodCappedUncappedCells
						}
						type="checkbox"
						name="broodCappedUncappedCells"
						id="broodCappedUncappedCells"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="oneEggPerCell">
						oneEggPerCell
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={
							state.oneEggPerCell
						}
						type="checkbox"
						name="oneEggPerCell"
						id="oneEggPerCell"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="antsPresent">
						antsPresent
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={
							state.antsPresent
						}
						type="checkbox"
						name="antsPresent"
						id="antsPresent"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="mothsPresent">
						mothsPresent
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={
							state.mothsPresent
						}
						type="checkbox"
						name="mothsPresent"
						id="mothsPresent"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="unusualNumberDeadBees">
						unusualNumberDeadBees
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={
							state.unusualNumberDeadBees
						}
						type="checkbox"
						name="unusualNumberDeadBees"
						id="unusualNumberDeadBees"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="odor">odor</label>
					<input
						onChange={changeHandler}
						defaultChecked={state.odor}
						type="checkbox"
						name="odor"
						id="odor"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="tracheal">
						tracheal
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={state.tracheal}
						type="checkbox"
						name="tracheal"
						id="tracheal"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="varroa">varroa</label>
					<input
						onChange={changeHandler}
						defaultChecked={state.varroa}
						type="checkbox"
						name="varroa"
						id="varroa"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="spaceForNectar">
						spaceForNectar
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={
							state.spaceForNectar
						}
						type="checkbox"
						name="spaceForNectar"
						id="spaceForNectar"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="queenSeen">
						queenSeen
					</label>
					<input
						onChange={changeHandler}
						defaultChecked={state.queenSeen}
						type="checkbox"
						name="queenSeen"
						id="queenSeen"
					/>
				</div>
				<div className="flex grow justify-center bg-two">
					<div className="basis-1/3 ">
						<label htmlFor="framesCoveredWithBees">
							framesCoveredWithBees
						</label>
						<input
							onChange={changeHandler}
							defaultValue={
								state.framesCoveredWithBees
							}
							type="number"
							name="framesCoveredWithBees"
							id="framesCoveredWithBees"
						/>
					</div>
					<div className="basis-1/3 ">
						<label htmlFor="framesUsedForBrood">
							framesUsedForBrood
						</label>
						<input
							onChange={changeHandler}
							defaultValue={
								state.framesUsedForBrood
							}
							type="number"
							name="framesUsedForBrood"
							id="framesUsedForBrood"
						/>
					</div>
				</div>
				<div className="flex  grow flex-col  items-center  ">
					<label htmlFor="comments">
						comments
					</label>
					<input
						onChange={changeHandler}
						defaultValue={state.comments}
						type="text"
						name="comments"
						id="comments"
					/>
				</div>
			</div>
			<button className="bg-two" type="submit">
				Update Inspection
			</button>
		</form>
	)
}
