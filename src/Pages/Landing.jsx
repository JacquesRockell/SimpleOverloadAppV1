import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Button, ButtonGroup, Flex } from '@chakra-ui/react'


export default function LandingPage(){
    return(
        <>
            <Flex direction='column' alignItems='center' justifyContent='center'>
                <h1>Landing Page</h1>
                <Flex>
                    <Button as={Link} to='/login' variant='primary'>Login</Button>
                    <Button as={Link} to='/register' variant='primaryOutline'>Resgister</Button>
                    <Button as={Link} to='/home' variant='primaryOutline'>home</Button>
                </Flex>
            </Flex>          
        </>
    )
}