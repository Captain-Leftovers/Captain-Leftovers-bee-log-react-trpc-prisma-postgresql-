
//types ts 

export interface User {
	id: string
	username: string
	email: string
}

export interface Hive {
	id: string
	beeFarmId: string
	name: string
	queenId?: string

}



export type Farm = {
	id: string
	farmName: string
	beekeeperUserId: string
	
}
export type Farms = [Farm]
