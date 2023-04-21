// types.ts





export interface SessionUser {
	id: string // or number, depending on your user ID type
	username: string
}

export interface UserData {
	id: string // or number, depending on your user ID type
	username: string
	email: string
}

export interface SessionData {
	user: SessionUser
}
