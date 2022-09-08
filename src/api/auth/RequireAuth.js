import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from 'react'

const RequireAuth = () => {
    const token = localStorage.getItem('accesstoken')
    const location = useLocation()

  return (
    token ? <Outlet/> : <Navigate to="/login" state={{from: location }} replace />
  )
}

export default RequireAuth