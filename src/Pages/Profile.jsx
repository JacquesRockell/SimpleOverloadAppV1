import React from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { Button, Heading, HStack, Flex, Divider, Box, Spacer, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, FormErrorMessage, AlertDialog,} from '@chakra-ui/react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import { Field, Form, Formik } from 'formik'
import { createPlan } from '../Axios/Plan/createPlan'
import { deletePlan } from '../Axios/Plan/deletePlan'
import PlanCard from '../Components/PlanCard'

//Context
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'

export default function Profile() {
    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser, update, setUpdate, message } = useContext(AppContext)
    
    const { isOpen, onOpen, onClose } = useDisclosure()

    async function handleCreate(data){
        onClose()

        setUser({...user, workoutPlans: [...user.workoutPlans, data]})

        const res = await createPlan(authToken, API, data) 
        if(res.error){
            message(res.error, 'error')
        } else {
            message(res.data, 'success')
            setUpdate(!update) 
        }             
    }

    function validatation(values){
        const errors = {}
        if (!values.title) errors.title = 'Title Required'
        return errors
    }

    return (
        <>   
            <Flex direction='column' align='stretch' gap={5} w='100%'>
                <Text fontSize='3xl'>{user && user.username}</Text>
                <Spacer />
                <Heading size='xl' color='primary'>My Workout Plans</Heading>
                {user && 
                    user.workoutPlans.map((plan, index) => (
                        <PlanCard key={index} plan={plan} />                     
                    ))     
                }             
                <Button size='lg' w="100%" variant='primaryOutline' onClick={onOpen}>Create New Plan</Button>        
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent bg={secondary}>
                        <ModalHeader>Create Plan</ModalHeader>
                        <ModalCloseButton />
                        <Formik
                            initialValues={{ title: '' }}
                            validate={values => validatation(values)}
                            validateOnBlur={true}
                            validateOnChange={true}
                            onSubmit={(values) => {
                                handleCreate(values)
                            }}
                        >
                            {(props) => (
                                <Form>
                                    <Field name="title">
                                        {({ field, form }) => (
                                            <ModalBody>
                                                <FormControl isInvalid={form.errors.title && form.touched.title} >
                                                    <FormLabel htmlFor='title'>Title</FormLabel>
                                                    <Input {...field} id='title' placeholder='Title..' />
                                                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                                                </FormControl>
                                            </ModalBody> 
                                        )}
                                    </Field>
                                    <ModalFooter>
                                        <HStack gap={1} justifyContent='flex-end'>                                            
                                            <Button variant='primaryOutline' onClick={onClose}>Cancle</Button>
                                            <Button variant='primary' type='submit'>Create</Button>
                                        </HStack>    
                                    </ModalFooter>             
                                </Form>
                            )}
                        </Formik>
                    </ModalContent>
                </Modal>               
            </Flex>      
        </>  
    )
}

