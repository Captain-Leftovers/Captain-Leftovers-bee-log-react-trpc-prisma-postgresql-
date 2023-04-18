
//types ts 

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
