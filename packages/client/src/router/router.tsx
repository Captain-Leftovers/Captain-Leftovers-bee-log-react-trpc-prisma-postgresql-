import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import ErrorLayout from '../components/Layout/errorLayout/ErrorLayout'
import RootLayout from '../components/Layout/rootLayout/RootLayout'
import ProtectedUserRoutes from '../components/ProtectedUserRoutes'
import UserDetails from '../components/UserDetails'
import HiveDetails from '../components/HiveDetails'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<RootLayout />}
			ErrorBoundary={ErrorLayout}
		>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="user" element={<ProtectedUserRoutes />}>
				<Route path=":id" element={<UserDetails />} />
				<Route
					path=":id/details/:hiveId/:hiveNumber"
					element={<HiveDetails/>}
				/>
			</Route>
			<Route path="/*" element={<Home />} />
		</Route>
	)
)

export default router
