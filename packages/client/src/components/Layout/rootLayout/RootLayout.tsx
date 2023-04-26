import { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import UserContext from '../../../context/UserContext'
import { trpc } from '../../../utils/trpc'
import { toast } from 'react-hot-toast'
import { errorHandler } from '../../../utils/errorHandler'

import logo from '../../../assets/BeeReadingLogo.png'

export default function RootLayout() {
	//try animation
	const [showNavFooter, setShowNavFooter] = useState(true)
	

	//end
	const userContext = useContext(UserContext)
	const isLoggedIn = !!userContext?.user
	const location = useLocation()

	useEffect(() => {
		if (
			location.pathname === '/login' ||
			location.pathname === '/register'
		) {
			setShowNavFooter(false)
		} else {
			setShowNavFooter(true)
		}
	}, [location])

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
		<div className="relative flex min-h-screen w-screen flex-col overflow-hidden ">
			<header
				className={`${
					showNavFooter
						? 'translate-y-0'
						: '-translate-y-full'
				} flex  flex-wrap bg-six transition-all duration-500`}
			>
				<nav className="grow self-center bg-two p-4 ">
					<div className="">
						<p className="mx-auto w-fit ">
							BeeKeeper's Log
						</p>
					</div>
					<div className="">
						<div className="flex  flex-wrap sm:gap-10">
							<img
								src={logo}
								alt="beee reading"
								className="h-12 w-auto"
							/>

							<div className="flex grow  items-center  justify-end">
								<div className=" mx-auto ">
									<div className="bg-three px-2 hover:bg-opacity-80">
										<NavLink to="/">
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
										<div className="ml-auto bg-three px-2 hover:bg-opacity-80">
											<NavLink to="register">
												Register
											</NavLink>
										</div>
									</>
								)}
								{isLoggedIn && (
									<>
										<div className=" uppercase text-three hover:opacity-80">
											{isLoggedIn ? (
												<NavLink
													className=''
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
										<div className="ml-auto bg-five px-2 hover:bg-opacity-80">
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
			<main
				className={`${
					showNavFooter ? 'pt-0' : 'pt-4'
				} flex-grow justify-center bg-lavender bg-cover transition-all duration-500 lg:bg-beeLg`}
			>
				<div className="container ">
					<Outlet />
				</div>
			</main>
			<footer
				className={`${
					showNavFooter
						? 'translate-y-0'
						: 'translate-y-full'
				} h-[5vh] bg-one text-center transition-all duration-500`}
			>
				<div className="container mx-auto flex flex-wrap items-center justify-between px-4">
					<div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-1.5">
						<ul className="flex items-center space-x-4">
							<li>
								<a
									href="https://github.com/Captain-Leftovers/Captain-Leftovers-bee-log-react-trpc-prisma-postgresql-"
									className="text-four hover:text-five"
									target="_blank"
									rel="noopener noreferrer"
								>
									GitHub
								</a>
							</li>
							<li>
								<a
									href="https://www.linkedin.com/in/dobromir-ivanov-710136261/"
									className="text-four hover:text-five"
									target="_blank"
									rel="noopener noreferrer"
								>
									LinkedIn
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-four hover:text-five"
									target="_blank"
									rel="noopener noreferrer"
								>
									Portfolio
								</a>
							</li>
							<li>
								<a
									href="mailto:beeondweb@gmail.com"
									className="text-four hover:text-five"
								>
									Email
								</a>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		</div>
	)
}
