import { NavLink, Outlet } from 'react-router-dom'

export default function RootLayout() {
	let errorB = new Error('Error')

	return (
		<div className="flex h-screen w-screen flex-col bg-gray-300  ">
			<header className="">
				<nav className="bg-lime-400 px-6">
					<div className="">
						<div className="flex gap-20 text-xl">
							<h1 className="text-3xl ">
								BeeKeeper-log
							</h1>
							<div className="flex grow  justify-end  gap-9 items-center">
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
									<NavLink to="logout">
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
			<footer className="mt-auto h-10 bg-blue-300 w-full text-center">
				<div className="">
					<h1 className="text-3xl">
						BeeKeeper-log footer
					</h1>
				</div>
			</footer>
		</div>
	)
}
