import { useState } from 'react'
import FormInput from './common/FormInput'
import { trpc } from '../utils/trpc'
import { errorHandler } from '../utils/errorHandler'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { addUserLocalStorage } from '../utils/authFn'

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
	email: '',
	password: 'Darkwolf128!',
}

export default function Login() {
	const [userData, setUserData] = useState(initialState)

	const navigate = useNavigate()

	type UserState = typeof initialState

	const { mutate } = trpc.user.loginUser.useMutation({
		onError: (error) => {
			console.log(error)

			errorHandler(error)
		},
		onSuccess: (data) => {
			const user = data.currentUser
			addUserLocalStorage(user)
			navigate('/')

			toast.success(
				` ${user.username} Logged in successfully!`
			)
		},
	})

	const title = 'Login'
	const inputFields: InputFieldType[] = [
		{
			id: 1,
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
	]

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		await mutate({
			email: userData.email,
			password: userData.password,
		})
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
				Login Component
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
