import { trpc } from './utils/trpc'

export default  function TestTrpc() {
  const helloNoArgs = trpc.hello.useQuery();
  const helloWithArgs = trpc.hello.useQuery({ text: 'client' });
    console.dir(helloNoArgs);
    
	return (
		<div>
			<h1>TestTrpc</h1>
			<div>{helloNoArgs.data?.greeting}</div>
			<div>{helloWithArgs.data?.greeting || "wtf"}</div>
		</div>
	)
}
// test database query