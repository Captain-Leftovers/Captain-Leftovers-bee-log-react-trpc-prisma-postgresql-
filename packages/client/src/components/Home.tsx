import { trpc } from '../utils/trpc'

export default  function Home() {	
	
	const  usersQ =
		trpc.user.getUsers.useQuery(
			undefined,
			{
				enabled: true,
			}
		)

	const testCtx = trpc.test.test.useQuery()
    
	  let test =testCtx.data?.message
	  console.log();
	  
	  

	return (
		<div className="h-full bg-six flex flex-col">
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
								{user.username}
							</li>
						)
					})}
				</ul>
			
			</div>
			<p className='text-3xl p-2'>{test}</p>
		</div>
	)
}
