import { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import UserContext from '../../../context/UserContext'
import { trpc } from '../../../utils/trpc'
import { toast } from 'react-hot-toast'
import { errorHandler } from '../../../utils/errorHandler'

export default function RootLayout() {
	const userContext = useContext(UserContext)
	const logOutMutation = trpc.user.logoutUser.useMutation({
		onSuccess: () => {
			userContext?.setUser(null)
			toast.success('Logged out successfully!')
		},
		onError: (error) => {
			errorHandler(error)
		},
	})
	
	
	const handleLogout = () => {
		logOutMutation.mutate()
		
	}

	return (
		<div className="flex h-screen w-screen flex-col bg-gray-300  ">
			<header className="">
				<nav className="bg-lime-400 px-6">
					<div className="">
						<div className="flex gap-20 text-xl">
							<h1 className="text-3xl ">
								BeeKeeper-log
							</h1>
							<div className="flex grow  items-center  justify-end gap-9">
								<div className="mr-auto ">
									<NavLink
										className=""
										to="/"
									>
										Home
									</NavLink>
								</div>
								<div>
									<NavLink to="login">
										Login
									</NavLink>
								</div>
								<div>
									<NavLink to="register">
										Register
									</NavLink>
								</div>
								<div>
									<NavLink
										to="/"
										onClick={
											handleLogout
										}
									>
										Logout
									</NavLink>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>
			<main className="grow">
				<Outlet />
			</main>
			<footer className="mt-auto h-10 w-full bg-blue-300 text-center">
				<div className="">
					<h1 className="text-3xl">
						BeeKeeper-log footer
					</h1>
				</div>
			</footer>
		</div>
	)
}
