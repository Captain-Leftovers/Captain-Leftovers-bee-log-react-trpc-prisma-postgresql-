import { useEffect, useReducer } from 'react'
import { hiveFormReducer, initialData } from './hiveFormReducer'
import { formatDateForInput } from '../../utils/commonUtils'
import { SubmitInspection } from '../../types'
import { useParams } from 'react-router-dom'

let inspectionButton: 'Create' | 'Update'

export default function HiveForm({
	onSubmitAction,
	initial,
}: {
	onSubmitAction: (
		data: SubmitInspection,
		action: 'create' | 'update'
	) => void
	initial: any
}) {
	const [state, dispatch] = useReducer(hiveFormReducer, initialData)
	const params = useParams()
	const hiveId = params.hiveId
	if (!!initial?.id && initial.id !== undefined) {
		inspectionButton = 'Update'
	} else {
		inspectionButton = 'Create'
	}

	useEffect(() => {
		if (initial) {
			dispatch({
				type: 'SET_INITIAL_DATA',
				payload: initial,
			})
		}
	}, [initial])

	const changeHandler = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value, type, tagName } = e.target

		if (
			e.target instanceof HTMLInputElement &&
			type === 'checkbox'
		) {
			dispatch({
				type: 'UPDATE_CHECKBOX',
				payload: {
					[name]: e.target.checked,
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
		if (tagName === 'TEXTAREA') {
			dispatch({
				type: 'CHANGE_INPUT',
				payload: {
					[name]: value,
				},
			})
		}
	}

	const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		//

		if (!hiveId) return
		if (!!state.id) {
			onSubmitAction({ ...state, hiveId }, 'update')
			return
		}

		onSubmitAction({ ...state, hiveId }, 'create')
	}

	return (
		<form
			onSubmit={submitFormHandler}
			action="POST"
			className="mx-auto my-2  flex flex-col flex-wrap"
		>
			<div className="relative mx-auto  pb-2 ">
				<label
					htmlFor="inspectionDate"
					className="absolute left-1/2 -top-0 -translate-x-1/2  whitespace-nowrap text-lg   text-one"
				></label>
				<input
					onChange={changeHandler}
					type="date"
					value={formatDateForInput(
						state.inspectionDate
					)}
					name="inspectionDate"
					id="inspectionDate"
					//TODO : add style
					className=" mt-1 block w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2  px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm "
				/>
			</div>
			<div className="grid grid-cols-1  pb-4 ">
				<div className="flex items-center justify-between border-b-2 border-t-2 border-one px-6 py-1 text-lg">
					<label
						className=""
						htmlFor="beeEnterExitHive"
					>
						beeEnterExitHive
					</label>
					<input
						className=" curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={state.beeEnterExitHive}
						type="checkbox"
						name="beeEnterExitHive"
						id="beeEnterExitHive"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg">
					<label htmlFor="bringingPollen">
						bringingPollen
					</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={state.bringingPollen}
						type="checkbox"
						name="bringingPollen"
						id="bringingPollen"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="signsOfRobbing">
						signsOfRobbing
					</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={state.signsOfRobbing}
						type="checkbox"
						name="signsOfRobbing"
						id="signsOfRobbing"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="animalDisturbing">
						animalDisturbing
					</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={state.animalDisturbing}
						type="checkbox"
						name="animalDisturbing"
						id="animalDisturbing"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="beesCalmOnOpen">
						beesCalmOnOpen
					</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={state.beesCalmOnOpen}
						type="checkbox"
						name="beesCalmOnOpen"
						id="beesCalmOnOpen"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="isBroodPatternGood">
						isBroodPatternGood
					</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={
							state.isBroodPatternGood
						}
						type="checkbox"
						name="isBroodPatternGood"
						id="isBroodPatternGood"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="areLarvaeHealthyWhiteShiny">
						areLarvaeHealthyWhiteShiny
					</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={
							state.areLarvaeHealthyWhiteShiny
						}
						type="checkbox"
						name="areLarvaeHealthyWhiteShiny"
						id="areLarvaeHealthyWhiteShiny"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="isJellyPresent">
						isJellyPresent
					</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={state.isJellyPresent}
						type="checkbox"
						name="isJellyPresent"
						id="isJellyPresent"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="broodCappedUncappedCells">
						broodCappedUncappedCells
					</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={
							state.broodCappedUncappedCells
						}
						type="checkbox"
						name="broodCappedUncappedCells"
						id="broodCappedUncappedCells"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="oneEggPerCell">
						oneEggPerCell
					</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={state.oneEggPerCell}
						type="checkbox"
						name="oneEggPerCell"
						id="oneEggPerCell"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="antsPresent">
						antsPresent
					</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={state.antsPresent}
						type="checkbox"
						name="antsPresent"
						id="antsPresent"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="mothsPresent">
						mothsPresent
					</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={state.mothsPresent}
						type="checkbox"
						name="mothsPresent"
						id="mothsPresent"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="unusualNumberDeadBees">
						unusualNumberDeadBees
					</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={
							state.unusualNumberDeadBees
						}
						type="checkbox"
						name="unusualNumberDeadBees"
						id="unusualNumberDeadBees"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="odor">odor</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={state.odor}
						type="checkbox"
						name="odor"
						id="odor"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="tracheal">
						tracheal
					</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={state.tracheal}
						type="checkbox"
						name="tracheal"
						id="tracheal"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="varroa">varroa</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={state.varroa}
						type="checkbox"
						name="varroa"
						id="varroa"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="spaceForNectar">
						spaceForNectar
					</label>
					<input
						className="curosor-poifocus:text-xlnter align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={state.spaceForNectar}
						type="checkbox"
						name="spaceForNectar"
						id="spaceForNectar"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="queenSeen">
						queenSeen
					</label>
					<input
						className="curosor-pointer align-center after:l-0 relative  inline-flex h-12 w-24 flex-shrink-0 appearance-none items-center justify-center overflow-hidden rounded-full bg-three transition duration-200 after:absolute after:left-0 after:top-0 after:h-12 after:w-12 	after:scale-90 after:rounded-full after:bg-five after:duration-200 after:content-[''] checked:bg-two checked:after:translate-x-12 checked:after:bg-green-400 focus:outline-none focus:ring-2 focus:ring-two focus:ring-offset-2"
						onChange={changeHandler}
						checked={state.queenSeen}
						type="checkbox"
						name="queenSeen"
						id="queenSeen"
					/>
				</div>

				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="framesCoveredWithBees">
						framesCoveredWithBees
					</label>
					<input
						className="w-10 text-center text-2xl "
						onChange={changeHandler}
						value={
							state.framesCoveredWithBees
						}
						type="number"
						name="framesCoveredWithBees"
						id="framesCoveredWithBees"
					/>
				</div>
				<div className="flex items-center justify-between border-b-2 border-one px-6 py-1 text-lg ">
					<label htmlFor="framesUsedForBrood">
						framesUsedForBrood
					</label>
					<input
						className="w-10 text-center text-2xl"
						onChange={changeHandler}
						value={state.framesUsedForBrood}
						type="number"
						name="framesUsedForBrood"
						id="framesUsedForBrood"
					/>
				</div>

				<div className="flex  grow flex-col  items-center  ">
					<label htmlFor="comments">
						comments
					</label>
					<textarea
						className="h-24 w-full rounded-lg border-2 border-one p-2"
						onChange={changeHandler}
						value={state.comments}
						name="comments"
						id="comments"
					/>
				</div>
			</div>
			//TODO : add style to button
			<button className="bg-two" type="submit">
				{inspectionButton}
			</button>
		</form>
	)
}
