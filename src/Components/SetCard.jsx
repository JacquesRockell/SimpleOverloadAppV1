import React from 'react'
import { Box, Button, Center, Checkbox, Flex, Grid, GridItem, Heading, HStack, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Spacer, Text } from '@chakra-ui/react'
import { DeleteIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons'
import { Draggable } from 'react-beautiful-dnd'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { deleteSet } from '../Axios/Set/deleteSet'
import { editSet } from '../Axios/Set/editSet'

//Context
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'


export default function SetCard({planId, dayId, set, index}) {
    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser, update, setUpdate } = useContext(AppContext)

    const [selected, setSelected] = useState(false)
    const [rpe, setRpe] = useState(set.rpe)
    const [repRange, setRepRange] = useState(set.repRange)
    const [weight, setWeight] = useState(set.weight > 0 ? set.weight : '-')

    const [rpeSave, setRpeSave] = useState()
    const [repRangeSave, setRepRangeSave] = useState()
    const [weightSave, setWeightSave] = useState()

    const [isEdit, setIsEdit] = useState(false)

    const handleEdit = () => {
        setRpeSave(rpe)
        setRepRangeSave(repRange)
        setWeightSave(weight)
        setIsEdit(true)
    }

    const handleCancle = () => {
        setRpe(rpeSave)
        setRepRange(repRangeSave)
        setWeight(weightSave)
        setIsEdit(false)
    }

    const handleSave = async () => {
        setIsEdit(false)
        const edit = {
            rpe: rpe,
            repRange: repRange,
            weight: weight,
        }

        let planArr = user.workoutPlans
        let planIndex = planArr.findIndex(plan => { return plan._id == planId })
        if(planIndex == -1) return console.log('Plan Error')

        let dayArr = planArr[planIndex].days
        let dayIndex = dayArr.findIndex(day => { return day._id == dayId })
        if(dayIndex == -1) return console.log('Day Error')

        let setIndex = dayArr[dayIndex].sets.findIndex(ob => { return ob._id == set._id })
        if(setIndex == -1) return console.log('Set Error')

        let editedSet = set
        editedSet.rpe = rpe
        editedSet.repRange = repRange
        editedSet.weight = weight

        planArr[planIndex].days[dayIndex].sets.splice(setIndex, 1, editedSet)
        setUser({...user, workoutPlans: planArr})
        
        setUser({...user, workoutPlans: planArr})
        const setRes = await editSet(authToken, API, planIndex, dayIndex, set._id, edit)
        if(setRes.error){
            console.log("error")
        } else {
            
        } 
    }

    const handleDelete = async () => {
        let planArr = user.workoutPlans
        let PI = planArr.findIndex(ob => { return ob._id == planId })
        if(PI == -1) return console.log('Plan Error')

        let dayArr = planArr[PI].days
        let DI = dayArr.findIndex(ob => { return ob._id == dayId })
        if(DI == -1) return console.log('Day Error')

        let SI = dayArr[DI].sets.findIndex(ob => { return ob._id == set._id })
        if(SI == -1) return console.log('Set Error')

        planArr[PI].days[DI].sets.splice(SI, 1)
        setUser({...user, workoutPlans: planArr})
        
        const setRes = await deleteSet(authToken, API, PI, DI, set._id)
        if(setRes.error){
            console.log("error")
        } else {
            setUpdate(!update)
        } 
    }

    return (
        <>
            <Draggable draggableId={set._id} index={index}>
                {provided => (
                    <Flex 
                        {...provided.draggableProps}
                        
                        ref={provided.innerRef}
                        direction='column' 
                        gap={2} 
                        alignItems='center' 
                        w='100%' 
                        bg={secondary} 
                        borderRadius='lg' 
                        p={5} 
                    >
                        <Grid 
                            templateColumns='repeat(3, 1fr)'
                            textAlign='center'
                            width='100%'
                        >
                            <GridItem></GridItem>
                            <GridItem>
                                <Heading size='md' color='primary'>{set.name.toUpperCase()}</Heading>
                            </GridItem>
                            <GridItem textAlign='right'>
                                { isEdit ? 
                                    <HStack justify='end'>
                                        <Button variant='primary' rightIcon={<EditIcon/>} onClick={handleSave}>Save</Button>
                                        <Button onClick={handleCancle}>Cancle</Button>
                                    </HStack>         
                                    : 
                                    <HStack justify='end'>
                                        <Button variant='ghost' rightIcon={<EditIcon/>} onClick={handleEdit}>Edit</Button>
                                        <IconButton icon={<DeleteIcon />} onClick={handleDelete}/>
                                    </HStack>
                                }        
                            </GridItem>
                        </Grid>
                        <Grid 
                            templateColumns='40px 1fr 40px'
                            gap={5}
                            textAlign='center'
                            w='100%'
                            columnGap={5}
                            p={0}
                        >   
                            <GridItem>
                                <Checkbox size='lg' value={selected} onChange={(val) => setSelected(val)}></Checkbox>
                            </GridItem>   
                            <GridItem>
                                <Grid columnGap={5} templateColumns={{md: 'repeat(3, 1fr)'}}>
                                    <GridItem>
                                        <Text fontSize='xl'>RPE</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text fontSize='xl'>Rep Range</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text fontSize='xl'>Weight</Text>
                                    </GridItem>

                                    <GridItem>
                                        <Text fontSize='xl'>{rpe}</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text fontSize='xl'>{repRange[0]} - {repRange[1]}{repRange[1] >= 25 ? '+' : ''}</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text fontSize='xl'>{weight}</Text>
                                    </GridItem>
                                    {isEdit &&
                                        <>
                                            <GridItem>
                                                <Flex alignItems='center' h='100%'>
                                                    <Slider defaultValue={rpe} min={5} max={10} step={1} onChange={(val) => setRpe(val)}>
                                                        <SliderTrack >
                                                            <Box position='relative' right={10} />
                                                            <SliderFilledTrack bg='primary'/>
                                                        </SliderTrack>
                                                        <SliderThumb boxSize={6} bg='primary' />
                                                    </Slider>
                                                </Flex>
                                            </GridItem>
                                            <GridItem>
                                                <Flex alignItems='center' h='100%'>
                                                    <RangeSlider defaultValue={repRange} min={1} max={25} step={1} onChange={(val) => setRepRange(val)}>
                                                        <RangeSliderTrack>
                                                            <RangeSliderFilledTrack bg='primary' />
                                                        </RangeSliderTrack>
                                                        <RangeSliderThumb boxSize={6} index={0} bg='primary'/>
                                                        <RangeSliderThumb boxSize={6} index={1} bg='primary'/>
                                                    </RangeSlider>
                                                </Flex>
                                            </GridItem>
                                            <GridItem>
                                                <NumberInput step={5} defaultValue={weight} min={0} max={5000} onChange={(val) => setWeight(val > 0 ? val : '-')}>
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </GridItem>
                                        </>
                                    }
                                </Grid>         
                            </GridItem>    
                            <GridItem {...provided.dragHandleProps}>
                                <IconButton as={Flex} h='100%' icon={<HiOutlineDotsVertical/>}/>
                            </GridItem>           
                        </Grid>
                    </Flex>
                )}
            </Draggable>
              
        </>
    )
}
