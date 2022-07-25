import React from 'react'

//Context
import { useContext, useState } from 'react'
import { AppContext } from '../App'

export default function PublicPlans() {
    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser } = useContext(AppContext)

    return (
        <div>PublicPlans</div>
    )
}
