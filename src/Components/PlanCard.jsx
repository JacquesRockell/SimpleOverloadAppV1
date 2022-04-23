import React from 'react'
import { Box, Button, Divider, Flex, Heading, HStack, Spacer, useDisclosure, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialog, AlertDialogCloseButton, useEditableControls, Editable, EditablePreview, Input, EditableInput, IconButton, ButtonGroup, } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { deletePlan } from '../Axios/Plan/deletePlan'
import { renamePlan } from '../Axios/Plan/renamePlan'

//Context
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'

export default function PlanCard({plan}) {
    //Context
    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser, update, setUpdate } = useContext(AppContext)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const titleRef = React.useRef()

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
  
    const handleRenamePlan = async (id, title) => {  
        let array = [...user.workoutPlans]
        let index = array.findIndex(ob => { return ob._id == id })
        if (index !== -1) {
            array[index].title = title
            setUser({...user, workoutPlans: array})
            renamePlan(authToken, API, index, title)
            setUpdate(!update)
        }       
    }

    const handleDeletePlan = async (id) => { 
        onClose()
        let array = [...user.workoutPlans]
        let index = array.findIndex(ob => { return ob._id == id })
        if (index !== -1) {
            array.splice(index, 1)
            setUser({...user, workoutPlans: array})
            deletePlan(authToken, API, index)
        }       
    }

    return (
        <>
            <Flex direction='column'>  
                <Divider /> 
                <Spacer />
                <Box _hover={{bg: secondary}} borderRadius='lg' padding={5} mt={5}>
                    <Flex justifyContent='space-between' alignItems='center' >
                        <Editable
                            textAlign='center'
                            defaultValue={plan.title}
                            fontSize='2xl'
                            isPreviewFocusable={false}
                            onSubmit={() => handleRenamePlan(plan._id, titleRef.current.value)}
                        >   
                            <Flex alignItems='baseline' gap={2}>
                                <EditablePreview />
                                <Input ref={titleRef} as={EditableInput} maxW={20} />
                                <EditableControls />
                            </Flex>
                        </Editable>  
                        {plan._id ?
                            //Adding plan to UI before sever response
                            <HStack align='flex-end'>   
                                    <Button as={ReactLink} to={'/home/' + plan._id} variant='primary'>Open</Button>
                                    <Button colorScheme='red' bg='red.500' onClick={onOpen}>Delete</Button>
                            </HStack>
                            :
                            <HStack align='flex-end'>   
                                <Button isLoading variant='primary'/>
                            </HStack>
                        }
                    </Flex>
                </Box>                
            </Flex>   
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
                        Are you sure you want to permanently delete <b>{plan.title}</b>.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>No</Button>
                        <Button colorScheme='red' bg='red.500' ml={3} onClick={()=>handleDeletePlan(plan._id)}>Yes</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
