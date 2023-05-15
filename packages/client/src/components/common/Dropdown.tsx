import { useEffect, useRef, useState } from 'react'

type DropdownProps = {
	items: { name: string; id: string }[]
	text: string
	callbackFn?: (id: string) => void
	addNewOnClick?: () => void
	openDropdown: boolean
	addNewButtonText?: string
	delFn: (farmId: string) => void
}

function Dropdown({
	items,
	text,
	addNewOnClick,
	callbackFn,
	openDropdown,
	addNewButtonText,
	delFn,
}: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false)
	useEffect(() => {
		setIsOpen(openDropdown)
	}, [openDropdown])

	const dialog = useRef<HTMLDialogElement>(null)
	const toggleDropdown = () => setIsOpen(!isOpen)
	const clickedButton = () => {
		if (addNewOnClick) {
			addNewOnClick()
		}
		setIsOpen(false)
	}
	return (
		<div className="relative z-10 flex flex-col  items-center  ">
			<button
				onClick={toggleDropdown}
				className="  min-w-fit rounded-lg bg-six  px-4 py-2 text-three transition-colors duration-300 hover:bg-opacity-80"
			>
				{text}
			</button>

			{isOpen && (
				<div className="  mt-2 w-64 bg-gradient-to-b from-three to-two shadow-lg">
					<ul className="flex flex-col divide-y divide-gray-200 ">
						{items.map((item) => (
							<li
								key={item.id}
								className="flex"
							>
								<button
									onClick={() => {
										callbackFn?.(
											item.id
										)
										setIsOpen(
											false
										)
									}}
									className=" block w-full p-2 text-left hover:bg-six hover:bg-opacity-10 "
								>
									{
										item.name
									}
								</button>
								<button
									onClick={() =>
										dialog.current?.showModal()
									}
									className="bg-five hover:scale-105 hover:bg-opacity-80  px-2 hover:text-three"
								>
									Del
								</button>
								<dialog
									ref={
										dialog
									}
									className="   rounded-md bg-six p-4"
								>
									<p className="">
										Are
										you
										sure
										you
										want
										to
										Delete{' '}
									</p>
									<p className="mb-4 text-center font-extrabold text-four ">
										{
											item.name
										}
									</p>
									<div className="flex justify-center gap-10 ">
										<button
											className="rounded-md bg-two bg-opacity-75 py-2 px-10  hover:text-three"
											onClick={() => {
												dialog.current?.close()
											}}
										>
											No
										</button>
										<button
											className="rounded-md bg-five bg-opacity-75 py-2 px-10 hover:text-three "
											onClick={() => {
												delFn(
													item.id
												)
											}}
										>
											YES
										</button>
									</div>
								</dialog>
							</li>
						))}
					</ul>
					{!!addNewButtonText && (
						<button
							onClick={clickedButton}
							className={` w-full bg-four p-2 hover:bg-opacity-80`}
						>
							{addNewButtonText}
						</button>
					)}
				</div>
			)}
		</div>
	)
}

export default Dropdown
