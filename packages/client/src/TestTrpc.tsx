import { trpc } from './utils/trpc'

export default function TestTrpc() {
	const helloNoArgs = trpc.hello.useQuery()
	const helloWithArgs = trpc.hello.useQuery({ text: 'client' })
	console.dir(helloNoArgs)

	return (
		<div>
			<h1 className=" bg-clip-text  text-transparent text-4xl underline bg-gradient-to-t from-purple-300 to-blue-700 hover:text-purple-400 my-4">
				TestTrpc
			</h1>
			<div>{helloNoArgs.data?.greeting}</div>
			<div>{helloWithArgs.data?.greeting || 'wtf'}</div>
		</div>
	)
}
// test database query
