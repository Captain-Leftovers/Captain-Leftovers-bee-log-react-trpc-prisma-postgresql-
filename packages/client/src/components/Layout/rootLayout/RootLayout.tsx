import { NavLink } from 'react-router-dom'

export default function RootLayout() {
	let errorB = new Error('Error')

	return (
		<header>
			<nav className="">
				<div className="container bg-cyan-500">
					<div className="flex gap-24 text-xl">
						<h1 className="text-3xl ">
							BeeKeeper-log
						</h1>
						{/* <div className="hidden">{}</div> */}
						<div className="flex gap-8">
							<NavLink className='' to="/">
								Home
							</NavLink>
							<NavLink to="login">
								Login
							</NavLink>
							<NavLink to="logout">
								Logout
							</NavLink>
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}
