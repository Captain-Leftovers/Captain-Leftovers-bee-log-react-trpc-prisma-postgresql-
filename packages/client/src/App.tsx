import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import { trpc } from './utils/trpc'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'

export default function App() {
	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		trpc.createClient({

			links: [
				httpBatchLink({
				
					url: `http://localhost:${
						import.meta.env.VITE_API_PORT
					}/trpc`,
					// optional
					fetch(url, options) {
						return fetch(url, {
							...options,
							  credentials: 'include',
							
						})
						
					},
				}),
			],
		})
	)
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<ReactQueryDevtools
					initialIsOpen={false}
					position="bottom-right"
				/>
			</QueryClientProvider>
		</trpc.Provider>
	)
}
