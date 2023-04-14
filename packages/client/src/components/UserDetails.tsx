import { trpc } from '../utils/trpc'
import { errorHandler } from '../utils/errorHandler'
import { useContext, useState } from 'react'
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

	const pickedFarm = ctx?.userData.pickedFarm

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)
	const openFarmModal = () => setIsModalFarmOpen(true)
	const closeFarmModal = () => setIsModalFarmOpen(false)

	const modalFields = <></>

	const farmsQ = trpc.user.farms.getAllFarms.useQuery(undefined, {
		onError: (err) => {
			errorHandler(err)
		},
		onSuccess: (data: Farms) => {
			setFarms(data)
		},
	})

	const handlePickedFarm = (name: string) => {
		const picked = farms?.find((farm) => farm.farmName === name)
		if (!picked) return
		ctx?.setUserData({ ...ctx.userData, pickedFarm: picked })
	}

	const addNewFarmHandler = () => {
			openFarmModal()
		
	}

	const addHiveHandler = () => {
		openModal()
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
							(farm) => farm.farmName
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
			isOpen={isModalFarmOpen}
			onClose={closeFarmModal}
			title="add Farm "
			children={<div className="bg-lime-500">ddd</div>}
		/>
				
				<Modal
					isOpen={isModalOpen}
					onClose={closeModal}
					title="Add Hive to "
					children={modalFields}
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
