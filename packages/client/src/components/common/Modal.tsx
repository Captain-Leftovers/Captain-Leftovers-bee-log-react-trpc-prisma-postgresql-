// Modal.tsx
import React, { useEffect } from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	children?: React.ReactNode
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
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
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
			<div className=" relative  mx-auto flex w-full max-w-md flex-col rounded-lg bg-white shadow-lg">
				<div className=" w-fit self-end text-xl">
					<button onClick={onClose}>X</button>
				</div>
				<div className="px-6 py-4 ">
					<h2 className=" text-center text-lg font-semibold text-one">
						{title}
					</h2>
				</div>
				<div className="p-6 bg-red-200">{children}</div>
				<div className="flex justify-end px-6 py-4">
					<button
						onClick={onClose}
						className="rounded-lg bg-two px-4 py-2 text-white transition-colors duration-300 hover:bg-three"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	)
}

export default Modal
