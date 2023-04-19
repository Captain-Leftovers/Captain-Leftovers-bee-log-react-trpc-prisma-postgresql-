//types ts
export interface Inspection {
	id: string
	inspectionDate: Date
	updatedAt: Date
	beeEnterExitHive: boolean
	bringingPollen: boolean
	signsOfRobbing: boolean
	animalDisturbing: boolean
	beesCalmOnOpen: boolean
	isBroodPatternGood: boolean
	areLarvaeHealthyWhiteShiny: boolean
	isJellyPresent: boolean
	broodCappedUncappedCells: boolean
	oneEggPerCell: boolean
	antsPresent: boolean
	mothsPresent: boolean
	unusualNumberDeadBees: boolean
	odor: boolean
	tracheal: boolean
	varroa: boolean
	framesCoveredWithBees: number
	framesUsedForBrood: number
	spaceForNectar: boolean
	comments: string
	queenSeen: boolean
	hiveId: string
}

export interface User {
	id: string
	username: string
	email: string
}

export interface Hive {
	id: string
	beeFarmId: string
	number: number
	queenId?: string
}

export type Farm = {
	id: string
	farmName: string
	beekeeperUserId: string
}
export type Farms = [Farm]
