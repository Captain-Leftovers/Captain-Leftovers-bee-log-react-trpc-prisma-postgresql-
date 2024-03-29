import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import { trpc } from './utils/trpc'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import { errorHandler } from './utils/errorHandler'

export default function App() {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						onError: (error) => {
							errorHandler(error)
						},
					},
				},
			})
	)
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: `${
						import.meta.env.VITE_API_PORT
					}/trpc`,

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

//TODO : add confirmation when delete farm is clicked  and fx  the  logout function to redirect to home page
