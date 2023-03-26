import { useState } from 'react'

export default function FormInput(props: any) {
	const [blurred, setBlurred] = useState(false)

	const { value, label, id, onChange, errorMessage, ...inputProps } =
		props

	const handleOnBlur = () => {
		setBlurred(true)
	}

	return (
		<div>
			<label htmlFor={id}>{label}</label>
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
			/>
			<span>{errorMessage}</span>
		</div>
	)
}
