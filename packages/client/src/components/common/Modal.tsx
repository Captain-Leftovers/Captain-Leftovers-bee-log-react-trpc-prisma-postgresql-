// Modal.tsx
import React, { useEffect } from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	children?: React.ReactNode
	submitFn: (e:React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) =>void
}

const Modal = ({ isOpen, onClose, title, children, submitFn }: ModalProps) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}

		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])

	if (!isOpen) return null

	return (
		// see web dev video on modals and blog
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 ">
			<div className=" relative  mx-auto flex w-full max-w-md flex-col rounded-lg bg-two shadow-lg">
				<form onSubmit={(e)=>submitFn(e)}>

				<div className="mr-1.5 w-fit self-end text-xl">
					<button  onClick={onClose}>X</button>
				</div>
				<div className="px-6 py-4 ">
					<h2 className=" text-center text-lg font-semibold text-one">
						{title}
					</h2>
				</div>
				<div className="p-6">{children}</div>
				<div className="flex justify-between  justify-end px-6 py-4">
					<button
						type='submit'
						className="rounded-lg bg-three px-4 py-2 text-one transition-colors duration-300 hover:opacity-80"
					>
						Submit
					</button>
					<button
						onClick={onClose}
						className="rounded-lg bg-five px-4 py-2 text-one transition-colors duration-300 hover:opacity-80"
					>
						Close
					</button>
				</div>
				</form>
			</div>
		</div>
	)
}

export default Modal
