import { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import UserContext from '../../../context/UserContext'
import { trpc } from '../../../utils/trpc'
import { toast } from 'react-hot-toast'
import { errorHandler } from '../../../utils/errorHandler'

import BeeIcon from '../../common/BeeIcon'

export default function RootLayout() {
	//try animation
	const [showNavFooter, setShowNavFooter] = useState(true)

	//end
	const navigation = useNavigate()
	const userCtx = useContext(UserContext)
	const isLoggedIn = !!userCtx?.user
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

	const user = userCtx?.user ? userCtx?.user : null
	const logOutMutation = trpc.user.logoutUser.useMutation({
		onSuccess: () => {
			localStorage.removeItem('user')
			userCtx?.setUser(null)
			toast.success('Logged out successfully!')
		},
		onError: (error) => {
			errorHandler(error)
		},
	})

	const handleLogout = () => {
		logOutMutation.mutate()
		userCtx?.setUserData({})
		navigation('/')
	}

	return (
		<div className="relative flex h-screen min-h-screen w-screen   flex-col md:overflow-hidden ">
			<header
				className={`${
					showNavFooter
						? 'translate-y-0'
						: '-translate-y-full'
				} flex  flex-wrap transition-all duration-500`}
			>
				<nav className="grow self-center border-b bg-two p-2">
					<div className="">
						<p className="mx-auto w-fit ">
							BeeKeeper's Log
						</p>
					</div>
					<div className="">
						<div className="flex  flex-wrap sm:px-4 md:justify-between">
							<BeeIcon />

							<div className="flex grow  items-center  justify-end md:grow-0 md:gap-10 ">
								<div className=" mx-auto ">
									<div className=" px-2 hover:bg-opacity-80">
										<NavLink
											className="nav-link"
											to="/"
										>
											Home
										</NavLink>
									</div>
								</div>
								{!isLoggedIn && (
									<>
										<div className=" px-2 hover:bg-opacity-80">
											<NavLink
												className="nav-link"
												to="login"
											>
												Login
											</NavLink>
										</div>
										<div className="ml-auto  px-2 hover:bg-opacity-80">
											<NavLink
												className="nav-link"
												to="register"
											>
												Register
											</NavLink>
										</div>
									</>
								)}
								{isLoggedIn && (
									<>
										<div className=" uppercase text-three hover:opacity-80 ">
											{isLoggedIn ? (
												<NavLink
													className="nav-link  "
													to={
														`user/${user?.id}` ||
														''
													}
												>
													{
														userCtx
															.user
															?.username
													}
												</NavLink>
											) : null}
										</div>
										<div className="ml-auto px-2">
											<button
												className="nav-link"
												onClick={
													handleLogout
												}
											>
												Logout
											</button>
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
				} flex flex-grow   justify-center overflow-auto transition-all duration-500`}
			>
				<div className="container flex flex-grow flex-col ">
					<Outlet />
				</div>
			</main>
			<footer
				className={`${
					showNavFooter
						? 'translate-y-0'
						: 'translate-y-full'
				} flex h-[5vh] items-center justify-center bg-one text-center transition-all duration-500`}
			>
				<div className="container mx-auto flex flex-wrap   justify-center px-4  ">
					<div className="">
						<ul className="flex gap-4 md:gap-10">
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
