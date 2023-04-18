import { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import UserContext from '../../../context/UserContext'
import { trpc } from '../../../utils/trpc'
import { toast } from 'react-hot-toast'
import { errorHandler } from '../../../utils/errorHandler'

export default function RootLayout() {
	const userContext = useContext(UserContext)
	const isLoggedIn = !!userContext?.user

	const user = userContext?.user ? userContext?.user : null
	const logOutMutation = trpc.user.logoutUser.useMutation({
		onSuccess: () => {
			localStorage.removeItem('user')
			userContext?.setUser(null)
			toast.success('Logged out successfully!')
		},
		onError: (error) => {
			errorHandler(error)
		},
	})

	const handleLogout = () => {
		logOutMutation.mutate()
		userContext?.setUserData({})
	}

	return (
		<div className="relative min-h-screen w-screen flex flex-col">
			<header className="fixed top-0 left-0 right-0 z-10">
				<nav className="bg-two p-4">
					<div className="">
						<div className="flex gap-20 text-xl">
							<h1 className="text-3xl ">
								BeeKeeper-log
							</h1>
							<div className="flex grow  items-center  justify-end gap-9">
								<div className=" mr-auto ">
									<div className="bg-three px-2 hover:bg-opacity-80">
										<NavLink
											className=""
											to="/"
										>
											Home
										</NavLink>
									</div>
								</div>
								{!isLoggedIn && (
									<>
										<div className="bg-three px-2 hover:bg-opacity-80">
											<NavLink to="login">
												Login
											</NavLink>
										</div>
										<div className="bg-three px-2 hover:bg-opacity-80">
											<NavLink to="register">
												Register
											</NavLink>
										</div>
									</>
								)}
								{isLoggedIn && (
									<>
										<div className=" text-2xl uppercase text-three hover:opacity-80">
											{isLoggedIn ? (
												<NavLink
													to={
														`user/${user?.id}` ||
														''
													}
												>
													{
														userContext
															.user
															?.username
													}
												</NavLink>
											) : null}
										</div>
										<div className="bg-five px-2 hover:bg-opacity-80">
											<NavLink
												to="/"
												onClick={
													handleLogout
												}
											>
												Logout
											</NavLink>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</nav>
			</header>
			<main className=" pt-16 pb-16 flex-grow">
				<Outlet />
			</main>
			<footer className="fixed bottom-0 left-0 right-0 z-10 bg-one text-center">
				<div className="">
					<h1 className="text-3xl text-five">
						BeeKeeper-log footer
					</h1>
				</div>
			</footer>
		</div>
	)
}
