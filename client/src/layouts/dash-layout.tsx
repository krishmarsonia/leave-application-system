import * as React from 'react'
import { useAuth } from "@clerk/clerk-react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import LocationHistoryContext from '../context/locationHistory/locationHistoryContext'

export default function DashboardLayout() {
    const { userId, isLoaded } = useAuth()
    const navigate = useNavigate()
    const {setLocationHistory} = React.useContext(LocationHistoryContext);
    const location = useLocation();

    React.useEffect(() => {
        if (isLoaded && !userId) {
            setLocationHistory(location.pathname);
            navigate("/sign-in")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded])

    if (!isLoaded) return "Loading..."

    return (
        <Outlet />
    )
}