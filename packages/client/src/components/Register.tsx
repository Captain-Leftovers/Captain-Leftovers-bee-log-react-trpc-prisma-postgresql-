import { useState } from 'react'
import FormInput from './common/FormInput'
import { trpc } from '../utils/trpc'
import { toast } from 'react-hot-toast'
import {  addUserLocalStorage } from '../utils/authFn'
import { useNavigate } from 'react-router-dom'

export interface InputFieldType {
	id: number
	type: string
	placeholder: string
	required: boolean
	label: string
	name: string
	errorMessage: string
	pattern: string
	autoComplete?: string
}

const initialState = {
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
}

export default function Home() {
	const [userData, setUserData] = useState(initialState)
	
	const navigate = useNavigate()
	type UserState = typeof initialState

	const { mutate, } =
		trpc.registerUser.useMutation({
			onError: (error) => {
				toast.error(error.message) // redirect the user to home page
			},
			onSuccess: (data) => {
				const user = data.currentUser
				toast.success(
					`${user.name} registered successfully!`
				)
				addUserLocalStorage(user)
				navigate('/')
			},
		})

	const title = 'Register'
	const inputFields: InputFieldType[] = [
		{
			id: 1,
			type: 'text',
			placeholder: 'Username',
			required: true,
			label: 'Username',
			name: 'username',
			errorMessage:
				'Username should be 3-20 characters and should not contain special characters !',
			pattern: '^[a-zA-Z0-9]{3,20}$',
		},
		{
			id: 2,
			type: 'email',
			placeholder: 'Email',
			required: true,
			label: 'Email',
			name: 'email',
			errorMessage: 'It should be a valid email address!',
			pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$',
		},
		{
			id: 3,
			type: 'password',
			placeholder: 'Password',
			required: true,
			label: 'Password',
			name: 'password',
			errorMessage:
				'Password should be 6-24 characters and should include at least one number, one letter and one special character!',
			pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,24}$',
			autoComplete: 'off',
		},
		{
			id: 4,
			type: 'password',
			placeholder: 'Confirm Password',
			required: true,
			label: 'Confirm Password',
			name: 'confirmPassword',
			errorMessage: 'Passwords do not match!',
			pattern: userData.password,
			autoComplete: 'off',
		},
	]

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('in onSubmit' + JSON.stringify(userData));
		
		const user = await mutate({
			userName: userData.username,
			email: userData.email,
			password: userData.password,
			confirmPassword: userData.confirmPassword,
		})
		console.log('end onSubmit' + JSON.stringify(user));
		
	}

	const onChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		})
	}
	return (
		<div className="flex h-full flex-col items-center justify-center bg-yellow-300  text-sm">
			<h1 className="mb-4 text-center text-3xl">
				Register Component
			</h1>

			<div className="container   max-w-lg  rounded-md bg-lime-400 px-6 py-8   shadow-xl">
				<div className="">
					<form
						onSubmit={onSubmitHandler}
						action="POST"
						className="flex flex-col"
					>
						<h1 className="pb-4 text-center text-lg">
							{title}
						</h1>

						{inputFields.map(
							(
								inputField: InputFieldType
							) => (
								<FormInput
									key={
										inputField.id
									}
									{...inputField}
									value={
										userData[
											inputField.name as keyof UserState
										]
									}
									onChange={
										onChangeHandler
									}
								/>
							)
						)}
						<button className=" mx-auto w-2/4 rounded bg-blue-500 py-2  px-4 text-xl font-bold text-white hover:bg-blue-700">
							{' '}
							{title}{' '}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
