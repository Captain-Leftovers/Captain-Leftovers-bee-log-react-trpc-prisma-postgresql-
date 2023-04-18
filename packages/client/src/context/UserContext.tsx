import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { User } from '../types'
import { Farm } from '../types'

interface UserContextType {
	user: User | null
	setUser: React.Dispatch<React.SetStateAction<User | null>>
  userData: {
    pickedFarm?: Farm
	
  }
  setUserData:React.Dispatch<React.SetStateAction<object>>
}

const UserContext = createContext<UserContextType | null>(null)

interface UserProviderProps {
	children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null)
  	const [userData, setUserData] = useState({})

	useEffect(() => {
		const storedUser = localStorage.getItem('user')
		
		if (storedUser) {
			setUser(JSON.parse(storedUser))
		}
	}, [])

	useEffect(() => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user))
		} else {
			localStorage.removeItem('user')
		}
	}, [user])

	return (
		<UserContext.Provider value={{ user, setUser, userData, setUserData }}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
