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
import { registerUser } from '../Axios/registerUser'
import { getAuthToken } from '../Axios/getAuthToken'
//Context
import { useContext } from 'react'
import { AppContext } from '../App'


export default function RegisterPage(){
    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser, update, setUpdate } = useContext(AppContext)

    //Model
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modelTitle, setModelTitle] = useState('')
    const [modelMessage, setModelMessage] = useState('')

    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleRegister(data){
        const values = {username: data.username, password: data.password2}
        const res = await registerUser(API, values)
        if(res.error){        
            setModelTitle('Error Registering')
            setModelMessage(res.error)
            onOpen()
            setIsSubmitting(false)
            return false
        }  
    
        const getToken = await getAuthToken(API, values)
        if(getToken.error){        
            setModelTitle('Error Logging In')
            setModelMessage(getToken.error)
            onOpen()
            setIsSubmitting(false)
            return false
        }  

        setAuthToken(getToken.token)    
        window.localStorage.setItem('auth-token', getToken.token) 
        setUpdate(!update)      
    }

    function validatation(values){
        const errors = {}
        if (!values.username) errors.username = 'Username Required'           
        if (!values.password1) errors.password1 = 'Password Required'
        if (!values.password2) errors.password2 = 'Password Required'
        else if (values.password2 != values.password1) errors.password2 = 'Passwords Must Match'
        return errors;
    }

    return (
        <Flex justifyContent='center' alignItems='center' h='100%'>
            <Container p={0} m={0}>
                <Box p={10} borderRadius='xl' bg={secondary} boxShadow='2xl'>
                    <Heading>Register</Heading>
                    <Formik
                        initialValues={{ username: '', password1: '',  password2: ''}}
                        validate={values => validatation(values)}
                        validateOnBlur={true}
                        validateOnChange={true}
                        onSubmit={(values) => {
                            setIsSubmitting(true)
                            handleRegister(values)
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
                                <Field name="password1">
                                    {({ field, form } ) => (                   
                                        <FormControl isInvalid={form.errors.password1 && form.touched.password1} mt={5}>
                                            <FormLabel htmlFor='password'>Password</FormLabel>
                                            <Input {...field} type="password" id='password1' placeholder='Password..' />
                                            <FormErrorMessage>{form.errors.password1}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field> 
                                <Field name="password2">
                                    {({ field, form } ) => (                   
                                        <FormControl isInvalid={form.errors.password2 && form.touched.password2} mt={5}>
                                            <FormLabel htmlFor='password2'>Confirm Password</FormLabel>
                                            <Input {...field} type="password" id='password2' placeholder='Password..' />
                                            <FormErrorMessage>{form.errors.password2}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>                      
                                <HStack mt={10} spacing={5}>
                                    <Button variant='primary' isLoading={isSubmitting} type='submit'>
                                        Register
                                    </Button>
                                    <Text fontSize='sm' color='gray.500' as='i'>Or</Text>
                                    <Link as={ReactLink} to='/login'>Login</Link>
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