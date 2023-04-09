import { useContext } from "react"
import UserContext from "../context/UserContext"
import { Outlet } from "react-router-dom"
import Login from "./Login"



export default function ProtectedUserRoutes (){
    const userContext = useContext(UserContext)
    const isLoggedIn = !!userContext?.user



return (
    isLoggedIn ? <Outlet/> : <Login/>
)
}