import React from 'react'
import { Box, Button, Center, Flex, Grid, GridItem, Heading, HStack, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Spacer, Text } from '@chakra-ui/react'
import { DeleteIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons'
import { Draggable } from 'react-beautiful-dnd'
import { HiOutlineDotsVertical } from 'react-icons/hi'

//Context
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'

export default function SetCardLoading({set}) {

    const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser, update, setUpdate } = useContext(AppContext)

    return (
        <>
                <Flex 
                    pointerEvents='none'
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
                                <HStack justify='end'>
                                    <IconButton disabled isLoading/>
                                </HStack>                                
                        </GridItem>
                    </Grid>
                    <Grid 
                        templateColumns='1fr 40px'
                        gap={5}
                        textAlign='center'
                        w='100%'
                        columnGap={5}
                        p={0}
                    >      
                        <GridItem>
                            <Grid templateColumns={{md: 'repeat(3, 1fr)'}}>
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
                                    <Text fontSize='xl'>{set.rpe}</Text>
                                </GridItem>
                                <GridItem>
                                    <Text fontSize='xl'>{set.repRange[0]} - {set.repRange[1]}{set.repRange[1] >= 25 ? '+' : ''}</Text>
                                </GridItem>
                                <GridItem>
                                    <Text fontSize='xl'>{set.weight}</Text>
                                </GridItem>
                                 
                            </Grid>         
                        </GridItem>    
                        <GridItem>
                            <IconButton as={Flex} h='100%' isLoading/>
                        </GridItem>  
                    </Grid>
                </Flex>     
        </>
    )
}
