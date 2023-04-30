import { useState } from 'react'

export default function FormInput(props: any) {
	const [blurred, setBlurred] = useState<boolean>(false)

	const { value, label, id, onChange, errorMessage, ...inputProps } =
		props


	const handleOnBlur = () => {
		setBlurred(true)
	}

	return (
		<div className="container mx-auto flex flex-col  ">
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
				className='peer border-2 border-gray-200  p-2  focus:border-two focus:outline-none hover:border-two transition-colors duration-500 ease-in-out'
			/>
			<span
				className={` text-five opacity-0 ${
					blurred ? 'opacity-100' : ''
				}  peer-valid:opacity-0`}
			>
				{errorMessage}
			</span>
		</div>
	)
}
