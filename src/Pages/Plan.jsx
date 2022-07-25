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
    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser, update, setUpdate, message } = useContext(AppContext)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const focusRef = React.useRef()

    const handleAddDay = async (values) => {
        onClose()
        let planArr = user.workoutPlans
        let planIndex = planArr.findIndex(ob => { return ob._id == plan._id })
        if(planIndex == -1) return message('Plan Error', 'warning')

        planArr[planIndex].days.push(values)
        setUser({...user, workoutPlans: planArr})

        const dayRes = await addDay(authToken, API, planIndex, values)
        if(dayRes.error){
            message(dayRes.error, 'error')
        } else {
            message(dayRes.data, 'success')
            setUpdate(!update)
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
                <Heading size='2xl' mr={-3}>{plan.title}</Heading>           
                <Divider />     
                <Routes>
                    <Route index element={                
                        <>
                            {plan.days
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
                            handleAddDay(values)
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
