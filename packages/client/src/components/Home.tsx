import { trpc } from '../utils/trpc'

export default function Home() {
	const  usersQ =
		trpc.user.getUsers.useQuery(
			undefined,
			{
				enabled: true,
			}
		)
		console.log(usersQ);
		
    
	  

	return (
		<div className="h-full bg-purple-200 flex flex-col">
			<div>
				<h1 className="text-8xl text-red-400 ">
					Home Component
				</h1>
			</div>

			<div className="border-8 border-purple-600 bg-orange-400 p-2 grow">
				<h2 className=" text-6xl text-purple-600">
					Users List
				</h2>
				<ul className="list-inside list-disc text-4xl text-emerald-200">
					{usersQ.data?.usersArray.map((user) => {
						return (
							<li key={user.id}>
								{user.name}
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}
