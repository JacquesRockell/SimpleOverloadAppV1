import React from 'react'
import { MoonIcon } from '@chakra-ui/icons'
import { Button, Collapse, Container, Flex, Heading, HStack, Slide, useDisclosure, VStack } from '@chakra-ui/react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Plan from './Plan'
import Profile from './Profile'

//Context
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'


export default function HomePage(){
    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser } = useContext(AppContext)
    const { isOpen, onToggle } = useDisclosure()
    
    return(
        <>
            <Routes>         
                <Route path='/' element={<Heading>index</Heading>}/>
                <Route path='/profile' element={<Profile />}/>
                {user?.workoutPlans
                    .filter(plan => plan._id)
                    .map((plan) => (
                    <Route
                        path={`/${plan._id}`}
                        key={plan._id}
                        element={<Plan plan={plan} />}
                    />
                    ))
                } 
            </Routes>                        
        </>
    )
}