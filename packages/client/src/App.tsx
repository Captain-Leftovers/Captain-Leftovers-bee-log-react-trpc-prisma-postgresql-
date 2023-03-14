import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import  { useState } from 'react'
import TestTrpc from './TestTrpc'
import { trpc } from './utils/trpc'

export default function App() {
	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: `http://localhost:3005`,
					// optional
					fetch(url, options) {
						return fetch(url, {
						  ...options,
						//   credentials: 'include',
						});
					  },
				}),
			],
		})
	)
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{<TestTrpc />}
			</QueryClientProvider>
		</trpc.Provider>
	)
}
