import { useState } from 'react'
import { trpc } from '../utils/trpc'

export default function CronPing() {
	const [cron, setCron] = useState('')
	trpc.test.test.useQuery(undefined, {
		enabled: true,
		onSuccess: (data) => {
			setCron(data.message)
		},
	})
	return (
		<>
			<div>
				<p>{cron}</p>
			</div>
		</>
	)
}
//try
