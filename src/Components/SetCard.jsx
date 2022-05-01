import React from 'react'
import { Box, Button, Center, Flex, Grid, GridItem, Heading, HStack, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Spacer, Text } from '@chakra-ui/react'

//Context
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { DeleteIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons'
import { Draggable } from 'react-beautiful-dnd'

export default function SetCard({planId, dayId, set, index}) {
    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser, update, setUpdate } = useContext(AppContext)

    const [sliderValue, setSliderValue] = useState(set.rpe)
    const [rangeSliderValue, setRangeSliderValue] = useState(set.repRange)
    const [weightValue, setWeightValue] = useState(set.weight > 0 ? set.weight : '-')

    const [sliderValueSave, setSliderValueSave] = useState()
    const [rangeSliderValueSave, setRangeSliderValueSave] = useState()
    const [weightValueSave, setWeightValueSave] = useState()

    const [isEdit, setIsEdit] = useState(false)

    const handleEdit = () => {
        setSliderValueSave(sliderValue)
        setRangeSliderValueSave(rangeSliderValue)
        setWeightValueSave(weightValue)
        setIsEdit(true)
    }

    const handleCancle = () => {
        setSliderValue(sliderValueSave)
        setRangeSliderValue(rangeSliderValueSave)
        setWeightValue(weightValueSave)
        setIsEdit(false)
    }

    const handleSave = () => {
        setIsEdit(false)
    }

    return (
        <Draggable draggableId={set._id} index={index}>
            {provided => (
                <Flex 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
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
                                    <IconButton icon={<DeleteIcon />}/>
                                </HStack>
                            }        
                        </GridItem>
                    </Grid>
                    <Grid 
                        templateColumns='repeat(3, 1fr)'
                        gap={5}
                        textAlign='center'
                        w='100%'
                        columnGap={'15%'}
                        padding={5}
                    >             
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
                            <Text fontSize='xl'>{sliderValue}</Text>
                        </GridItem>
                        <GridItem>
                            <Text fontSize='xl'>{rangeSliderValue[0]} - {rangeSliderValue[1]}{rangeSliderValue[1] >= 25 ? '+' : ''}</Text>
                        </GridItem>
                        <GridItem>
                            <Text fontSize='xl'>{weightValue}</Text>
                        </GridItem>
                        {isEdit &&
                            <>
                                <GridItem>
                                    <Flex alignItems='center' h='100%'>
                                        <Slider defaultValue={sliderValue} min={5} max={10} step={1} onChange={(val) => setSliderValue(val)}>
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
                                        <RangeSlider  defaultValue={rangeSliderValue} min={1} max={25} step={1} onChange={(val) => setRangeSliderValue(val)}>
                                            <RangeSliderTrack>
                                                <RangeSliderFilledTrack bg='primary' />
                                            </RangeSliderTrack>
                                            <RangeSliderThumb boxSize={6} index={0} bg='primary'/>
                                            <RangeSliderThumb boxSize={6} index={1} bg='primary'/>
                                        </RangeSlider>
                                    </Flex>
                                </GridItem>
                                <GridItem>
                                    <NumberInput step={5} defaultValue={weightValue} min={0} max={5000} onChange={(val) => setWeightValue(val > 0 ? val : '-')}>
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
                </Flex>
            )}
        </Draggable>
    )
}
