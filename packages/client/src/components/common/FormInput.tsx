import { useState } from 'react'

export default function FormInput(props: any) {
	const [blurred, setBlurred] = useState<boolean>(false)

	const { value, label, id, onChange, errorMessage, ...inputProps } =
		props


	const handleOnBlur = () => {
		setBlurred(true)
	}

	return (
		<div className="container mx-auto flex flex-col  bg-lime-400">
			<label
				className="mb-1 text-2xl font-bold uppercase"
				htmlFor={id}
			>
				{label}
			</label>
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
				className={`peer border-2 border-gray-200  p-2  focus:border-blue-500 focus:outline-none `}
			/>
			<span
				className={` text-secondary opacity-0 ${
					blurred ? 'opacity-100' : ''
				}  peer-valid:opacity-0`}
			>
				{errorMessage}
			</span>
		</div>
	)
}
