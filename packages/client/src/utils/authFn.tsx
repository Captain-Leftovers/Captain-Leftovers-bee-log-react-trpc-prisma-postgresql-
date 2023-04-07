import { User } from "../types"

export const addUserLocalStorage = (user: User) => {
	//TODO :  remove the user from local storage when added cookie syste
	localStorage.setItem('user', JSON.stringify(user))
}

export const loginFn = (user: User) => {}
