import { Link } from 'react-router-dom'

export default function ErrorLayout() {
	return (
		<div className="flex h-screen flex-col items-center bg-purple-400 ">
			<h1 className=" text-center text-6xl font-bold text-purple-600   underline decoration-cyan-300">
				Error Layout Component
			</h1>
			<h2 className="text-6xl">404</h2>
			<h2 className="text-6xl">Page not found</h2>
			<div className="mt-40 w-2/12 rounded-lg bg-cyan-400 p-4 text-center text-4xl hover:opacity-75">
				<Link to="/">GO HOME</Link>
			</div>
		</div>
	)
}
