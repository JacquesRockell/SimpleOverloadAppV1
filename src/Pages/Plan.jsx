import React from 'react'
import { Button, Heading, HStack, IconButton, Menu, MenuButton, MenuList, MenuItem, Flex, Divider, VStack, StackDivider, OrderedList, ListItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, useDisclosure, ModalBody, FormControl, FormLabel, Input, FormErrorMessage, ModalFooter, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialog, AlertDialogCloseButton, Breadcrumb, BreadcrumbItem, BreadcrumbLink, } from '@chakra-ui/react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import DayCard from '../Components/DayCard'
import Day from './Day'
import { addDay } from '../Axios/Day/addDay'
import { Field, Form, Formik } from 'formik'
import { Outlet, Route, Routes, Link, useLocation } from 'react-router-dom'

//Context
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'


export default function Plan({plan}) {
    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser, update, setUpdate } = useContext(AppContext)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const focusRef = React.useRef()

    const handleAdd = async (values) => {
        onClose()
        let array = [...user.workoutPlans]
        let index = array.findIndex(ob => { return ob._id == plan._id })
        if (index !== -1) {
            array[index].days.push(values)
            setUser({...user, workoutPlans: array})
            const dayRes = await addDay(authToken, API, index, values)
            if(dayRes.error){
                console.log("error")
            } else {
                setUpdate(!update)
            }
        }           
    }

    function validatation(values){
        const errors = {}
        if (!values.name) errors.name = 'Name Required'
        return errors
    }

    return (
        <>   
            <Flex direction='column' gap={5} w='100%'>
                <Menu>                 
                    <MenuButton>
                        <HStack alignItems='flex-end'>
                            <Heading size='2xl' mr={-3}>{plan.title}</Heading>
                            <BiDotsVerticalRounded  fontSize={26}/>
                        </HStack>                  
                    </MenuButton>
                    <MenuList bg={secondary}maxW='2rem'>
                        <MenuItem icon={<FiEdit />}>Edit Title</MenuItem>
                        <MenuItem icon={<AiOutlineDelete />}>Delete {plan.title}</MenuItem>
                    </MenuList>
                </Menu>
                <Divider />     
                <Routes>
                    <Route index element={                
                        <>
                            {plan.days
                                .filter(day => day._id)
                                .map((day) => 
                                    <DayCard planId={plan._id} day={day} key={day._id} />
                                )
                            }
                            <Button size='lg' w="100%" variant='primaryOutline' onClick={onOpen}>Add Day</Button>
                        </>
                    }/>
                    {plan?.days
                        .filter(day => day._id)
                        .map((day) => (         
                            <Route 
                                path={`/${day._id}`}
                                key={day._id}
                                element={<Day day={day} planId={plan._id}/>}
                            />
                        ))
                    }
                </Routes> 
                <Outlet />  
            </Flex> 
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={focusRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >     
                <AlertDialogOverlay />
                <AlertDialogContent bg={secondary}>
                    <AlertDialogHeader>Add Day</AlertDialogHeader>
                    <AlertDialogCloseButton />   
                    <Formik
                        initialValues={{ name: '' }}
                        validate={values => validatation(values)}
                        validateOnBlur={false}
                        validateOnChange={true}
                        onSubmit={(values) => {
                            handleAdd(values)
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Field name="name">
                                    {({ field, form }) => (
                                        <AlertDialogBody> 
                                            <FormControl isInvalid={form.errors.name && form.touched.name} >
                                                <FormLabel htmlFor='name'>Name</FormLabel>
                                                <Input ref={focusRef} {...field} id='name' placeholder='Name..' />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        </AlertDialogBody>
                                    )}
                                </Field> 
                                <AlertDialogFooter>
                                    <Button onClick={onClose}>Cancle</Button>
                                    <Button variant='primary' ml={3} type='submit'>Add</Button>
                                </AlertDialogFooter>           
                            </Form>
                        )}
                    </Formik>                
                </AlertDialogContent>
            </AlertDialog>            
        </>  
    )
}
