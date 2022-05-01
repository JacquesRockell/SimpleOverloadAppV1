import React from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import SetCard from '../Components/SetCard'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'

export default function Day({day, planId}) {

    const handleDragEnd = result => {
        console.log("droped")
    }

    return (
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
                <Button size='lg' w="100%" variant='primaryOutline'>Add Set</Button> 
            </Flex>      
        </DragDropContext>
    )
}
