import { useEffect, useReducer } from 'react'
import { hiveFormReducer, initialData } from './hiveFormReducer'
import { formatDateForInput } from '../../utils/commonUtils'
import { SubmitInspection } from '../../types'
import { useParams } from 'react-router-dom'

export default function HiveForm({
	onSubmitAction,
	initial,
}: {
	onSubmitAction: (data: SubmitInspection, action:'create' | 'update') => void
	initial:any
}) {
	const [state, dispatch] = useReducer(hiveFormReducer, initialData)
	const params = useParams()
	const hiveId = params.hiveId

	useEffect(() => {
		if (initial) {
			dispatch({
				type: 'SET_INITIAL_DATA',
				payload: initial,
			})
		}
	}, [initial])


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
			if (type === 'number') {
				return dispatch({
					type: 'CHANGE_INPUT',
					payload: {
						[name]: Number(value),
					},
				})
			}

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
		//
		
		if (!hiveId) return
		if(state.id && state.id !== undefined){
	//TODO : fix types  and fix this  grgrgrgr
			onSubmitAction({ ...state, hiveId } , 'update')
			return
		}


		onSubmitAction({ ...state, hiveId } , 'create')
	}

	return (
		<form
			onSubmit={submitFormHandler}
			action="POST"
			className="mx-auto flex  flex-col flex-wrap"
		>
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
			<div className="flex  flex-wrap pb-4 ">
				<div className=" ">
					<label htmlFor="beeEnterExitHive">
						beeEnterExitHive
					</label>
					<input
						onChange={changeHandler}
						checked={state.beeEnterExitHive}
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
						checked={state.bringingPollen}
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
						checked={state.signsOfRobbing}
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
						checked={state.animalDisturbing}
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
						checked={state.beesCalmOnOpen}
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
						checked={
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
						checked={
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
						checked={state.isJellyPresent}
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
						checked={
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
						checked={state.oneEggPerCell}
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
						checked={state.antsPresent}
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
						checked={state.mothsPresent}
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
						checked={
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
						checked={state.odor}
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
						checked={state.tracheal}
						type="checkbox"
						name="tracheal"
						id="tracheal"
					/>
				</div>
				<div className="basis-1/3 ">
					<label htmlFor="varroa">varroa</label>
					<input
						onChange={changeHandler}
						checked={state.varroa}
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
						checked={state.spaceForNectar}
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
						checked={state.queenSeen}
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
							value={
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
							value={
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
						value={state.comments}
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
