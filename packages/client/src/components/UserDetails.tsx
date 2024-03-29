import { trpc } from '../utils/trpc'
import { errorHandler } from '../utils/errorHandler'
import { useContext, useRef, useState } from 'react'
import Dropdown from './common/Dropdown'
import UserContext from '../context/UserContext'
import Modal from './common/Modal'
import { toast } from 'react-hot-toast'
import { Farm, Farms, Hive } from '../types'
import HiveSvg from './common/HiveSvg'
import { nextHiveNumber } from '../utils/commonUtils'

export default function UserDetails() {
	const [addHiveNumber, setAddHiveNumber] = useState<number | ''>('')
	const [farms, setFarms] = useState<Farm[] | null>(null)
	const [hives, setHives] = useState<Hive[] | null>(null)
	const [isModalFarmOpen, setIsModalFarmOpen] = useState(false)
	const ctx = useContext(UserContext)
	const queryUtils = trpc.useContext()

	const createNewFarmQ = trpc.user.farms.createNewFarm.useMutation({
		onError: (error) => {
			errorHandler(error)
		},
		onSuccess: (data) => {
			queryUtils.user.farms.getAllFarms.invalidate()
			ctx?.setUserData({ ...ctx.userData, pickedFarm: data })
		},
	})
	const delFarmQ = trpc.user.farms.deleteFarm.useMutation({
		onError: (error) => {
			errorHandler(error)
		},
		onSuccess: (data) => {
			queryUtils.user.farms.getAllFarms.invalidate()
			setHives(null)
			ctx?.setUserData({ ...ctx.userData, pickedFarm: null })
			toast(`${data.farmName} deleted`)
		},
	})
	const farmsQ = trpc.user.farms.getAllFarms.useQuery(undefined, {
		onError: (err) => {
			errorHandler(err)
		},
		onSuccess: (data: Farms) => {
			setFarms(data)
		},
	})
	const getFarmHivesQ = trpc.user.farms.hives.getFarmhives.useQuery(
		{ beeFarmId: ctx?.userData.pickedFarm?.id || null },
		{
			onError: (err) => {
				errorHandler(err)
			},
			onSuccess: (data: Hive[]) => {
				setHives(data)
			},
			enabled: !!ctx?.userData.pickedFarm,
		}
	)

	const createHiveQ = trpc.user.farms.hives.createNewHive.useMutation({
		onError: (err) => {
			errorHandler(err)
		},
		onSuccess: () => {
			toast.success('Hive created')
			getFarmHivesQ.refetch()
		},
	})

	const farmInput = useRef<HTMLInputElement | null>(null)

	

	const pickedFarm = ctx?.userData.pickedFarm

	const openFarmModal = () => setIsModalFarmOpen(true)
	const closeFarmModal = () => setIsModalFarmOpen(false)

	const handlePickedFarm = (id: string) => {
		const picked = farms?.find((farm) => farm.id === id)
		if (!picked) return
		ctx?.setUserData({ ...ctx.userData, pickedFarm: picked })
	}

	const addNewFarmHandler = () => {
		openFarmModal()
	}

	const addHiveHandler = () => {
		if (!pickedFarm) return
		let hiveNumber: number = nextHiveNumber(hives)
		if (!!addHiveNumber) hiveNumber = addHiveNumber

		createHiveQ.mutate({
			beeFarmId: pickedFarm?.id,
			number: hiveNumber,
		})
		setAddHiveNumber('')
	}

	const farmSubmit = (
		e:
			| React.FormEvent<HTMLFormElement>
			| React.KeyboardEvent<HTMLInputElement>
	) => {
		e.preventDefault()
		closeFarmModal()
		const inputValue = farmInput.current?.value
		if (!inputValue) return
		createNewFarmQ.mutate(inputValue)
	}

	
	const delFarmHandler = (id: string) => {
		delFarmQ.mutate({ farmId: id })
	}

	return (
		<div className="flex h-full flex-col items-center gap-1   ">
			<div className=" flex gap-4 py-2">
				{farmsQ.data ? (
					<Dropdown
						delFn={delFarmHandler}
						addNewOnClick={
							addNewFarmHandler
						}
						openDropdown={!!!pickedFarm}
						addNewButtonText="Add new Farm"
						callbackFn={handlePickedFarm}
						text="Farms"
						items={farmsQ.data.map(
							(farm: Farm) => ({
								id: farm.id,
								name: farm.farmName,
							})
						)}
					/>
				) : (
					<button className="rounded-lg bg-five px-4 py-2 text-one transition-colors duration-300 hover:bg-opacity-80">
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
			{pickedFarm ? (
				<div className="relative flex items-center gap-4">
					<button
						disabled={createHiveQ.isLoading}
						onClick={addHiveHandler}
						className="
					
					 btn-secondary"
					>
						{` Add Hive to ${
							pickedFarm?.farmName ||
							'your Farm'
						}`}
					</button>
					<input
						onChange={(e) =>
							setAddHiveNumber(
								+e.target.value
							)
						}
						className="absolute -right-12  w-10 text-center"
						type="number"
						value={addHiveNumber}
						placeholder="num"
						min="1"
						step="1"
					/>
				</div>
			) : null}
			<div className=" grow    overflow-auto py-2">
				<div className="flex flex-wrap justify-center gap-2 ">
					{hives?.map((hive) => (
						<HiveSvg
							hiveId={hive.id}
							key={hive.id}
							hiveNumber={hive.number}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
