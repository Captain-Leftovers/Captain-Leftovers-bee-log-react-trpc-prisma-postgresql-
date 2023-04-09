import { useParams } from "react-router-dom"

export default function UserDetails() {
    const userID = useParams().id


	return (
		<div className="bg-orange-700">
			<p>User Details PAGE</p>
			<div className="h-1/2 w-1/2 bg-yellow-700">{userID}</div>
		</div>
	)
}
