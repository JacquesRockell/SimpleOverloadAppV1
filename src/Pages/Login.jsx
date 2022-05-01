import React from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Heading,
    Button,
    useColorMode,
    Link,
    HStack,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Flex,
    Container,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { Link as ReactLink } from 'react-router-dom'
import axios from 'axios' 
import { getAuthToken } from '../Axios/getAuthToken'
//Context
import { useContext } from 'react'
import { AppContext } from '../App'


export default function LoginPage(){
    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser, update, setUpdate } = useContext(AppContext)

    //Model
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modelTitle, setModelTitle] = useState('')
    const [modelMessage, setModelMessage] = useState('')

    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleLogin(values){
        const res = await getAuthToken(API, values)
        if(res.error){        
            setModelTitle('Error Logging In')
            setModelMessage(res.error)
            onOpen()
            setIsSubmitting(false)
            return false
        }  
        else if(res.token){
            setAuthToken(res.token)    
            window.localStorage.setItem('auth-token', res.token) 
            setUpdate(!update)
        }     
    }

    function validatation(values){
        const errors = {}
        if (!values.username) errors.username = 'Username Required'           
        if (!values.password) errors.password = 'Password Required'
        return errors;
    }


    return (
        <Flex justifyContent='center' alignItems='center' h='100%'>
            <Container p={0} m={0}>
                <Box p={10} borderRadius='xl' bg={secondary} boxShadow='2xl'>
                    <Heading>Login</Heading>
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        validate={values => validatation(values)}
                        validateOnBlur={true}
                        validateOnChange={true}
                        onSubmit={(values) => {
                            setIsSubmitting(true)
                            handleLogin(values)
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Field name="username">
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.username && form.touched.username} mt={5}>
                                            <FormLabel htmlFor='username'>Username</FormLabel>
                                            <Input {...field} id='username' placeholder='Username..' />
                                            <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="password">
                                    {({ field, form } ) => (                   
                                        <FormControl isInvalid={form.errors.password && form.touched.password} mt={5}>
                                            <FormLabel htmlFor='password'>Password</FormLabel>
                                            <Input {...field} type="password" id='password' placeholder='Password..' />
                                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>                      
                                <HStack mt={10} spacing={5}>
                                    <Button  variant='primary' isLoading={isSubmitting} type='submit'>
                                        Login
                                    </Button>
                                    <Text fontSize='sm' color='gray.500' as='i'>Or</Text>
                                    <Link as={ReactLink} to='/register'>Register</Link>
                                </HStack>                       
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Container>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={secondary}>
                    <ModalHeader>{modelTitle}</ModalHeader>
                    <ModalBody>{modelMessage}</ModalBody>
                    <ModalFooter>
                        <Button variant='primary' mr={3} onClick={onClose}>OK</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}