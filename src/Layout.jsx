import React from 'react'
import { Outlet, Link as ReactLink, useResolvedPath, useMatch } from 'react-router-dom'
import { Flex, Button, IconButton, Container, Box, Spacer, Text, Divider, Link, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody, PopoverFooter, Portal, VStack, HStack, Heading, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
import { MoonIcon, SunIcon, SettingsIcon, HamburgerIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { RiHomeLine } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { BiSpreadsheet } from 'react-icons/bi'

//Context
import { useContext, useEffect, useState } from 'react'
import { AppContext } from './App'

export default function Layout() {
    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser } = useContext(AppContext)
    const [isOpen, setIsOpen] = useState(true)

    function signOut(){  
        window.localStorage.removeItem('auth-token')
        setAuthToken(null) 
        setUser(null)    
    }

    return (	
        <Flex pos="relative">            
            <Flex 
                pos="sticky"
                top={0}
                bg={secondary} 
                direction="column"
                left={0}
                w={isOpen ? '18rem' : '80px'}
                h='100vh'
                p={5}
                gap={5}
            >      
                <Flex alignItems='center' gap={5} >
                    <IconButton icon={<HamburgerIcon/>} onClick={() => setIsOpen(!isOpen)} />
                    <Text isTruncated>{user && user.username}</Text>
                </Flex>  
                <Divider />
                <Flex 
                    direction="column"
                    gap={5}
                    overflowY='auto'
                    overflowX='hidden'
                >
                    <NavItem to="/">
                        <Flex w='100%' justify='flex-start' alignItems='center' gap={5} minH='2.5rem'>                   
                            <RiHomeLine/>
                            <NavItemText isOpen={isOpen}>
                                <Text>Landing</Text>
                            </NavItemText>                             
                        </Flex>   
                    </NavItem>
                    <NavItem to="home/">
                        <Flex w='100%' justify='flex-start' alignItems='center' gap={5} minH='2.5rem'>                   
                            <RiHomeLine/>
                            <NavItemText isOpen={isOpen}>
                                <Text>Home</Text>
                            </NavItemText>                             
                        </Flex>   
                    </NavItem>
                    <NavItem to="home/profile" >
                        <Flex w='100%' justify='flex-start' alignItems='center' gap={5} minH='2.5rem'>                   
                            <CgProfile />
                            <NavItemText isOpen={isOpen}>
                                <Text>Profile</Text>
                            </NavItemText>                             
                        </Flex>   
                    </NavItem>
                    <Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem border='none' p={0}>
                            <AccordionButton  _focus={{outline: 'none'}} pl='10px'  w='100%' >
                                <Flex w='100%' justify='flex-start' alignItems='center' gap={5} minH='2.5rem'>                   
                                    <AccordionIcon />
                                    <NavItemText isOpen={isOpen}>
                                        <Text>Workout Plans</Text>
                                    </NavItemText>                             
                                </Flex> 
                            </AccordionButton>
                            <AccordionPanel p={0}>
                                <Flex direction="column" gap={5} >
                                    {user && 
                                        user.workoutPlans.map((plan, index) => (
                                            plan._id ?
                                                <NavItem to={"home/"+plan._id} key={index}>
                                                    <Flex w='100%' justify='flex-start' alignItems='center' gap={5} minH='2.5rem'>                   
                                                        <BiSpreadsheet />
                                                        <NavItemText isOpen={isOpen}>
                                                            <Text>{plan.title}</Text>
                                                        </NavItemText>                             
                                                    </Flex>   
                                                </NavItem> 
                                            :
                                            <NavItem to="home/" key={index}>
                                                <Flex w='100%' justify='flex-start' alignItems='center' gap={5} minH='2.5rem'>                   
                                                    <BiSpreadsheet />
                                                    <NavItemText isOpen={isOpen}>
                                                        <Text color='gray.500'>{plan.title}</Text>
                                                    </NavItemText>                             
                                                </Flex>   
                                            </NavItem>            
                                        ))
                                    }
                                </Flex>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                      
                </Flex>
                <Flex mt="auto" justify='space-between' alignItems='center'>
                    <Popover placement='top' offset={[90, 10]}>
                        <PopoverTrigger>
                        <Button w='100%' variant='primaryOutline'><SettingsIcon /></Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent w='200px' bg={secondary}>
                                <PopoverHeader p={5}><Text fontSize='lg' fontWeight='bold'>Settings</Text></PopoverHeader>
                                <PopoverBody p={5}>
                                    <VStack alignItems={"flex-start"} gap={3}>
                                        <Button w='100%' variant='primaryOutline' onClick={toggleColorMode}>{colorMode == 'light' ? <SunIcon/> : <MoonIcon/>}</Button>  
                                        {authToken ? 
                                            <Button w='100%' variant='primary' onClick={signOut}>Sign Out</Button>
                                            :
                                            <Button as={Link} to='/login' w='100%' variant='primary'>Login</Button>     
                                        }
                                    </VStack>                            
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>                            
                </Flex>                             
            </Flex> 	
            <Flex w='100%' alignItems='start'  p={20}>                           
                <Outlet />                            
            </Flex>
        </Flex>		

    )
}

function NavItemText({children, isOpen}){
    if(isOpen) return children
    else return ""
}

function NavItem({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
        <IconButton
            as={ReactLink}
            bg={ match ? 'primary' : 'transparent' }
            color={ match ? 'white' : 'current' }
            to={to}
            pl='12px'
            _focus={{outline: 'none'}}
            {...props}
        >
            {children}
        </IconButton>
    )
  }