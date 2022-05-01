import React from 'react'
import { Button, Heading, HStack, IconButton, Menu, MenuButton, MenuList, MenuItem, Flex, Divider, VStack, StackDivider, OrderedList, ListItem, useDisclosure, Box, Editable, EditablePreview, Input, EditableInput, useEditableControls, ButtonGroup, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { renameDay } from '../Axios/Day/renameDay'
import { deleteDay } from '../Axios/Day/deleteDay'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
//Context
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'

export default function DayCard({planId, day}) {
    //Context
    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser, update, setUpdate } = useContext(AppContext)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const nameRef = React.useRef() 

    function EditableControls() {
        const {
          isEditing,
          getSubmitButtonProps,
          getCancelButtonProps,
          getEditButtonProps,
        } = useEditableControls()
    
        return isEditing ? (
          <ButtonGroup justifyContent='center' size='sm'>
            <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
            <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
          </ButtonGroup>
        ) : (
          <Flex justifyContent='center'>
            <IconButton bg='none' size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
          </Flex>
        )
    }

    const handleRenameDay = async (name) => {  
        let planArr = [...user.workoutPlans]
        let PI = planArr.findIndex(ob => { return ob._id == planId })
        if(PI == -1) return console.log('Plan Error')

        let dayArr = planArr[PI].days
        let DI = dayArr.findIndex(ob => { return ob._id == day._id })
        if(DI == -1) return console.log('Day Error')
        
        planArr[PI].days[DI].name = name
        setUser({...user, workoutPlans: planArr})

        const dayRes = await renameDay(authToken, API, PI, DI, name)
        if(dayRes.error){
            console.log("error")
        } else {
            setUpdate(!update)
        }          
    }

    const handleDeletePlan = async () => { 
        onClose()
        let planArr = [...user.workoutPlans]
        let PI = planArr.findIndex(ob => { return ob._id == planId })
        if(PI == -1) return console.log('Plan Error')

        let dayArr = planArr[PI].days
        let DI = dayArr.findIndex(ob => { return ob._id == day._id })
        if(DI == -1) return console.log('Day Error')
        
        planArr[PI].days.splice(DI, 1)
        setUser({...user, workoutPlans: planArr})

        const dayRes = await deleteDay(authToken, API, PI, DI)
        if(dayRes.error){
            console.log("error")
        } else {
            setUpdate(!update)
        }              
    }

    return (
        <>
            <Box _hover={{bg: secondary}} borderRadius='lg' padding={5} mt={5}>
                <Flex justifyContent='space-between' alignItems='center' >
                    <Editable
                        textAlign='center'
                        defaultValue={day.name}
                        fontSize='2xl'
                        isPreviewFocusable={false}
                        onSubmit={() => handleRenameDay(nameRef.current.value)}
                    >   
                        <Flex alignItems='baseline' gap={2}>
                            <EditablePreview />
                            <Input ref={nameRef} as={EditableInput} maxW={20} />
                            <EditableControls />
                        </Flex>
                    </Editable>  
                    {day._id ?
                        //Adding plan to UI before sever response
                        <HStack align='flex-end'>   
                            <Button as={ReactLink} to={day._id} variant='primary'>Open</Button>
                            <Button colorScheme='red' bg='red.500' onClick={onOpen}>Delete</Button>
                        </HStack>
                        :
                        <HStack align='flex-end'>   
                            <Button isLoading variant='primary'/>
                        </HStack>
                    }
                </Flex>
            </Box>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
                
            >
                <AlertDialogOverlay />
                <AlertDialogContent bg={secondary}>
                    <AlertDialogHeader>Delete?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to permanently delete <b>{day.name}</b>.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>No</Button>
                        <Button colorScheme='red' bg='red.500' ml={3} onClick={handleDeletePlan}>Yes</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
