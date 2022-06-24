import React from 'react'
import { Outlet, Link as ReactLink } from 'react-router-dom'
import { Box, Button, ButtonGroup, Container, Flex, Heading, HStack, IconButton, VStack, Text } from '@chakra-ui/react'
import HeroImg from '../images/bg2.jpg'
//Context
import { useContext } from 'react'
import { AppContext } from '../App'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function LandingPage(){
    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser, update, setUpdate } = useContext(AppContext)

    return(
        <>
            <Box 
                position='absolute'
                top='0'
                left='0'
                w='100%'
                bgImage={HeroImg}
                bgPosition="center"
                bgRepeat="no-repeat"
                bgSize='cover'
            >   
                <Box w='100%' backdropFilter={colorMode == 'light' ? 'brightness(200%)' : 'brightness(60%)'}>
                    <Container maxW='container.lg'>
                        <Flex flexDirection='column'>
                            <HStack w='100%' gap={2} justifyContent='end' borderBottomColor={colorMode == 'light' ? 'gray.800' : 'gray.50'} borderBottomWidth='2px' pb={5} mt={10}>
                                <Button as={ReactLink} variant='ghost' to='/'>About</Button>
                                <Button as={ReactLink} variant='ghost' to='/register'>Register</Button>
                                <Button as={ReactLink} to='/login' variant='primaryOutline'>Login</Button>
                                <IconButton variant='outline' onClick={toggleColorMode} icon={colorMode == 'light' ? <SunIcon/> : <MoonIcon/>}/>
                            </HStack>
                            <Heading mt={20} size='4xl' maxW='30rem' useC>Welcome to Simple Overload App V1</Heading>
                            <Text mt={10} fontSize='2xl' maxW='50rem'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum optio reprehenderit maxime impedit error numquam et amet enim repellendus modi necessitatibus tempore laudantium odio, omnis qui, accusantium consectetur magnam nulla!</Text>
                            <HStack  mt={10} mb={20}>
                                <Button variant='primary' size='lg'>Register Now!</Button>
                            </HStack>
                        </Flex>        
                    </Container>
                </Box>  
            </Box>                         
        </>
    )
}