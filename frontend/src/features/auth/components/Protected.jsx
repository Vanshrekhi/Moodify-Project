import React, { Children } from 'react'
import { useAuth } from "../hooks/userAuth"
import { Navigate } from "react-router";

const Protected = ({ children }) => {
    const {
        user, loading
    } = useAuth()

    if (loading) {
        return <h1>loading...</h1>
    }

    if (!loading && !user) {
        return <Navigate to="/login" />
    }

    return children
}

export default Protected
