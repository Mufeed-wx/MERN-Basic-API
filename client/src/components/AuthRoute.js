import React from 'react'
import { useSelector } from 'react-redux'

function AuthRoute(props) {
    const { user } = useSelector((state) => state.user)
    const isAdmin = user?.isAdmin ? true : false;

    if (isAdmin) {
        return props.children
    } else {
        return (
                <h1>Auth failed</h1> 
        )
    }
}

export default AuthRoute