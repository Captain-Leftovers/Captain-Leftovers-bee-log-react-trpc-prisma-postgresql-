import { useState } from 'react'

export default function FormInput(props: any) {
	const [blurred, setBlurred] = useState(false)

	const { value, label, id, onChange, errorMessage, ...inputProps } =
		props

	const handleOnBlur = () => {
		setBlurred(true)
	}

	return (
		<div className='flex flex-col container bg-lime-400  mx-auto' >
			<label className='font-bold text-2xl uppercase mb-1' htmlFor={id}>{label}</label>
			<input 
				id={id}
				{...inputProps}
				onChange={onChange}
				onBlur={handleOnBlur}
				blurred={blurred.toString()}
				onFocus={() =>
					inputProps.name === 'confirmPassword'
						? setBlurred(true)
						: null
				}
				value={value}
                className='border-2 border-gray-200  p-2  focus:outline-none focus:border-blue-500'
			/>
			<span className='text-secondary' >{errorMessage}</span>
		</div>
	)
}
