import React from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack, useDisclosure, VStack } from '@chakra-ui/react'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import SetCard from '../Components/SetCard'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'

//Context
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { Field, Form, Formik } from 'formik'

export default function Day({day, planId}) {
    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser, update, setUpdate } = useContext(AppContext)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const focusRef = React.useRef()

    const [sliderValue, setSliderValue] = useState(8)
    const [rangeSliderValue, setRangeSliderValue] = useState([8,12])
    const [weightValue, setWeightValue] = useState('-')

    const handleDragEnd = result => {
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
        console.log(setArr)
        
        planArr = {...planArr, sets: setArr}

        setUser({...user, workoutplans: planArr  })
        
        // const dayRes = await addDay(authToken, API, index, values)
        // if(dayRes.error){
        //     console.log("error")
        // } else {
        //     setUpdate(!update)
        // }

    }

    function validatation(values){
        const errors = {}
        if (!values.name) errors.name = 'Name Required'
        return errors
    }

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Flex  direction='column' alignItems='start' gap={5}> 
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
                    <AlertDialogHeader>Add Set</AlertDialogHeader>
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
                                                <FormLabel htmlFor='name'>Movement</FormLabel>
                                                <Input ref={focusRef} {...field} id='name' placeholder='Bench Press..' />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        </AlertDialogBody>
                                    )}
                                </Field> 
                                <Field name="RPE">
                                    {({ field, form }) => (
                                        <AlertDialogBody> 
                                            <FormControl isInvalid={form.errors.RPE && form.touched.RPE} >
                                                <FormLabel htmlFor='RPE'>RPE</FormLabel>
                                                <Input {...field} id='RPE' value={sliderValue} />
                                                <Slider mt={2} defaultValue={sliderValue} min={5} max={10} step={1} onChange={(val) => setSliderValue(val)}>
                                                    <SliderTrack>
                                                        <Box position='relative' right={10} />
                                                        <SliderFilledTrack bg='primary' />
                                                    </SliderTrack>
                                                    <SliderThumb boxSize={6} bg='primary' />
                                                </Slider>
                                                <FormErrorMessage>{form.errors.RPE}</FormErrorMessage>
                                            </FormControl>
                                        </AlertDialogBody>
                                    )}
                                </Field> 
                                <Field name="repRange">
                                    {({ field, form }) => (
                                        <AlertDialogBody> 
                                            <FormControl isInvalid={form.errors.RPE && form.touched.RPE} >
                                                <FormLabel htmlFor='RPE'>RPE</FormLabel>
                                                <Input {...field} id='RPE' value={sliderValue} />
                                                <Slider mt={2} defaultValue={sliderValue} min={5} max={10} step={1} onChange={(val) => setSliderValue(val)}>
                                                    <SliderTrack>
                                                        <Box position='relative' right={10} />
                                                        <SliderFilledTrack bg='primary' />
                                                    </SliderTrack>
                                                    <SliderThumb boxSize={6} bg='primary' />
                                                </Slider>
                                                <FormErrorMessage>{form.errors.RPE}</FormErrorMessage>
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
