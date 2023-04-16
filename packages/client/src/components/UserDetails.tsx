import { trpc } from '../utils/trpc'
import { errorHandler } from '../utils/errorHandler'
import { useContext, useRef, useState } from 'react'
import Dropdown from './common/Dropdown'
import UserContext from '../context/UserContext'
import Modal from './common/Modal'

export type Farm = {
	id: string
	farmName: string
	beekeeperUserId: string
}
export type Farms = [Farm]

export default function UserDetails() {
	const [farms, setFarms] = useState<Farms | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isModalFarmOpen, setIsModalFarmOpen] = useState(false)
	const ctx = useContext(UserContext)
	const queryUtils = trpc.useContext()
	const createNewFarm = trpc.user.farms.createNewFarm.useMutation({
		onError: (error) => {
			errorHandler(error)
		},
		onSuccess: (data) => {
			queryUtils.user.farms.getAllFarms.invalidate()
			ctx?.setUserData({ ...ctx.userData, pickedFarm: data })

		},
	})

	const farmInput = useRef<HTMLInputElement | null>(null)

	const pickedFarm = ctx?.userData.pickedFarm

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)
	const openFarmModal = () => setIsModalFarmOpen(true)
	const closeFarmModal = () => setIsModalFarmOpen(false)

	const farmsQ = trpc.user.farms.getAllFarms.useQuery(undefined, {
		onError: (err) => {
			errorHandler(err)
		},
		onSuccess: (data: Farms) => {
			setFarms(data)
		},
	})

	const handlePickedFarm = (id: string) => {
		const picked = farms?.find((farm) => farm.id === id)
		if (!picked) return
		ctx?.setUserData({ ...ctx.userData, pickedFarm: picked })
	}

	const addNewFarmHandler = () => {
		openFarmModal()
	}

	const addHiveHandler = () => {
		openModal()
	}

	const farmSubmit = (
		e:
			| React.FormEvent<HTMLFormElement>
			| React.KeyboardEvent<HTMLInputElement>
	) => {
		e.preventDefault()
		closeFarmModal()
		const inputValue = farmInput.current?.value
		//TODO : add new farm on trpc backend
		if (!inputValue) return
		createNewFarm.mutate(inputValue)

		//TODO : Refetch the farms to display !!!
	}

	//TODO : get farms from db and display them

	return (
		<div className="flex h-full flex-col items-center gap-4 bg-six p-4 ">
			<div className=" flex gap-4 bg-lime-300">
				{farmsQ.data ? (
					<Dropdown
						addNewOnClick={
							addNewFarmHandler
						}
						addNewButtonText="Add new Farm"
						callbackFn={handlePickedFarm}
						text="Farms"
						items={farmsQ.data.map(
							(farm:Farm) => ({ id : farm.id, name: farm.farmName})
						)}
					/>
				) : (
					<button className="rounded-lg bg-one px-4 py-2 text-white transition-colors duration-300 hover:bg-two">
						Farms
					</button>
				)}
			</div>
			<div className="">
				<Modal
					submitFn={farmSubmit}
					isOpen={isModalFarmOpen}
					onClose={closeFarmModal}
					title="Add Farm "
					children={
						<div className="">
							<label>
								Farm Name :{' '}
							</label>
							<input
								onKeyDown={(
									e: React.KeyboardEvent<HTMLInputElement>
								) => {
									if (
										e.key ===
										'Enter'
									) {
										e.preventDefault()
										farmSubmit(
											e
										)
									}
								}}
								className={` m-2 rounded-md border-2  border-gray-200  p-2 focus:border-blue-500 focus:outline-none `}
								placeholder="type name here"
								ref={farmInput}
							/>
						</div>
					}
				/>
			</div>
			<div className="">
				<button
					onClick={addHiveHandler}
					className={`${
						pickedFarm
							? 'visible'
							: 'invisible'
					} rounded-md bg-one px-4 py-2 text-white`}
				>
					{` Add Hive to ${
						pickedFarm?.farmName ||
						'your Farm'
					}`}
				</button>
			</div>
			<div className="container bg-three"></div>
		</div>
	)
}
