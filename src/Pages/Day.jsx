import React from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import SetCard from '../Components/SetCard'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'
import { addSet } from '../Axios/Set/addSet'
import { Field, Form, Formik } from 'formik'
import SetCardLoading from '../Components/SetCardLoading'
import { updateSetOrder } from '../Axios/Set/updateSetOrder'

//Context
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'


export default function Day({day, planId}) {
    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser, update, setUpdate } = useContext(AppContext)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const focusRef = React.useRef()

    const [rpe, setRpe] = useState(8)
    const [repRange, setRepRange] = useState([8,12])
    const [weight, setWeight] = useState(0)
    const [amount, setAmount] = useState(1)

    const toast = useToast()

    const message = (content, status) => {
        toast({
            position: 'top',
            title: content,
            status: status,
            duration: 1500,
            variant: 'subtle',
        })
    }

    const handleDragEnd = async (result) => {
        const { destination, source, draggableId } = result
        if(!destination) return
        if( destination.droppableId === source.droppableId && destination.index === source.index) return
        
        let planArr = user.workoutPlans
        let PI = planArr.findIndex(ob => { return ob._id == planId })
        if(PI == -1) return console.log('Plan Error')

        let dayArr = planArr[PI].days
        let DI = dayArr.findIndex(ob => { return ob._id == day._id })
        if(DI == -1) return console.log('Day Error')

        let setArr = dayArr[DI].sets
        const movedSet = setArr[source.index]
        setArr.splice(source.index, 1)
        setArr.splice(destination.index, 0, movedSet)     
        
        planArr = {...planArr, sets: setArr}
        setUser({...user, workoutplans: planArr  })
        
        const setRes = await updateSetOrder(authToken, API, PI, DI, source.index, destination.index)
        if(setRes.error){
            console.log("error")
        } else {
            console.log(setRes.data)
            message(setRes.data, 'success')
        }

    }

    const handleAddSet = async (data) => {
        onClose() 
        const set = {
            name: data.name,
            rpe: rpe,
            repRange: repRange,
            weight: weight,
        }

        let planArr = user.workoutPlans
        let PI = planArr.findIndex(ob => { return ob._id == planId })
        if(PI == -1) return console.log('Plan Error')

        let dayArr = planArr[PI].days
        let DI = dayArr.findIndex(ob => { return ob._id == day._id })
        if(DI == -1) return console.log('Day Error')

        for(let i = amount; i > 0; i--){
            planArr[PI].days[DI].sets.push(set)
        }
        setUser({...user, workoutPlans: planArr})
        const setRes = await addSet(authToken, API, PI, DI, amount, set)
        if(setRes.error){
            console.log("error")
        } else {
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
            <DragDropContext onDragEnd={handleDragEnd}>
                <Flex direction='column' alignItems='start' gap={5}> 
                    <Button as={ReactLink} to={`/home/${planId}`} variant='ghost' size='lg' leftIcon={<ArrowLeftIcon/>}>
                        {day.name}...
                    </Button>
                    <Droppable droppableId={day._id}>
                        {provided => (
                            <VStack 
                                w='100%'
                                ref={provided.innerRef} 
                                {...provided.droppableProps}
                            >               
                                <Box/>      
                                {day.sets
                                    .filter(set => set._id)
                                    .map((set, index) => (
                                        <SetCard planId={planId} dayId={day._id} set={set} key={set._id} index={index}/>
                                ))} 
                                {provided.placeholder}                  
                            </VStack> 
                        )}
                    </Droppable>
                    <VStack mt={-3} w='100%'>
                        {day.sets
                            .filter(set => !set._id)
                            .map((set, index) => (
                                <SetCardLoading set={set} key={index}/>
                        ))} 
                    </VStack>
                    <Button size='lg' w="100%" variant='primaryOutline' onClick={onOpen}>Add Set</Button> 
                </Flex>      
            </DragDropContext>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={focusRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >     
                <AlertDialogOverlay />
                <AlertDialogContent bg={secondary}>
                    <AlertDialogHeader>Add Set/s</AlertDialogHeader>
                    <AlertDialogCloseButton />   
                    <Formik
                        initialValues={{ name: '' }}
                        validate={values => validatation(values)}
                        validateOnBlur={false}
                        validateOnChange={true}
                        onSubmit={(values) => {
                            handleAddSet(values)
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Field name="name">
                                    {({ field, form }) => (
                                        <AlertDialogBody> 
                                            <FormControl isInvalid={form.errors.name && form.touched.name} >
                                                <FormLabel htmlFor='name'>Exercise</FormLabel>
                                                <Input ref={focusRef} {...field} id='name' placeholder='Bench Press..' />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        </AlertDialogBody>
                                    )}
                                </Field> 
                                <AlertDialogBody> 
                                    <FormLabel htmlFor='rpe'>RPE</FormLabel>
                                    <Input isDisabled={1} id='rpe' value={rpe} />
                                    <Slider mt={2} defaultValue={rpe} min={5} max={10} step={1} onChange={(val) => setRpe(val)}>
                                        <SliderTrack>
                                            <Box position='relative' right={10} />
                                            <SliderFilledTrack bg='primary' />
                                        </SliderTrack>
                                        <SliderThumb boxSize={6} bg='primary' />
                                    </Slider>
                                </AlertDialogBody>
                                <AlertDialogBody>                                        
                                    <FormLabel htmlFor='repRange'>Rep Range</FormLabel>
                                    <HStack>
                                        <Input isDisabled={1} id='repRange1' value={repRange[0]} />
                                        <Input isDisabled={1} id='repRange2' value={repRange[1]} />
                                    </HStack>
                                    <RangeSlider mt={2} defaultValue={repRange} min={1} max={25} step={1} onChange={(val) => setRepRange(val)}>
                                            <RangeSliderTrack>
                                            <RangeSliderFilledTrack bg='primary' />
                                        </RangeSliderTrack>
                                        <RangeSliderThumb boxSize={6} index={0} bg='primary'/>
                                        <RangeSliderThumb boxSize={6} index={1} bg='primary'/>
                                    </RangeSlider>             
                                </AlertDialogBody>       
                                <AlertDialogBody> 
                                    <FormLabel htmlFor='weight'>Weight</FormLabel>
                                    <NumberInput defaultValue={weight} min={0} max={5000} step={5} onChange={(val) => setWeight(val)}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>                      
                                </AlertDialogBody>
                                <AlertDialogBody> 
                                    <FormLabel htmlFor='amount'>Sets to add</FormLabel>
                                    <Input isDisabled={1} id='amount' value={amount} />
                                    <Slider mt={2} defaultValue={amount} min={1} max={10} step={1} onChange={(val) => setAmount(val)}>
                                        <SliderTrack>
                                            <Box position='relative' right={10} />
                                            <SliderFilledTrack bg='primary' />
                                        </SliderTrack>
                                        <SliderThumb boxSize={6} bg='primary' />
                                    </Slider>
                                </AlertDialogBody>                      
                                <AlertDialogFooter>
                                    <Button onClick={onClose}>Cancle</Button>
                                    <Button variant='primary' ml={3} type='submit'>Add {amount} Set{amount > 1 ? 's' : ''}</Button>
                                </AlertDialogFooter>           
                            </Form>
                        )}
                    </Formik>                
                </AlertDialogContent>
            </AlertDialog> 
        </>
    )
}
