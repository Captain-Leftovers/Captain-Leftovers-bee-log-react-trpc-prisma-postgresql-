type User = {
	id: string
	name: string
	email: string
}

export const addUserLocalStorage = (user: User) => {
	//TODO :  remove the user from local storage when added cookie syste
	localStorage.setItem('user', JSON.stringify(user))
}
