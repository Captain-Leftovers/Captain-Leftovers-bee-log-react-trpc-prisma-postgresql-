import { Inspection, InspectionAction } from '../../types'

export const initialData: Inspection = {
	id: '',
	inspectionDate: new Date(
		new Date(Date.now())
			.toLocaleDateString()
			.split('/')
			.reverse()
			.join('-')
	),
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

export const hiveFormReducer = (
	state: Inspection,
	action: InspectionAction
): Inspection => {
	switch (action.type) {
		case 'UPDATE_CHECKBOX':
			return {
				...state,
				...action.payload,
			}
		case 'CHANGE_DATE':
			return {
				...state,
				...action.payload,
			}
		case 'CHANGE_INPUT':
			return {
				...state,
				...action.payload,
			}
		case 'SET_INITIAL_DATA':
			return {
				...(action.payload as Inspection),
			}

		default:
			return state
	}
}
