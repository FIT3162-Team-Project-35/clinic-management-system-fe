import { Box, HStack } from '@chakra-ui/react'

function DataBox(){
    const data = {
        noPatient: 100,
        noEncounter: 300,
        noAppointment: 30
    }

    return(
        <HStack>
            <Box as='button' borderRadius='md' bg='blue' color='white' px={4} h={45}>
                Patient: {data.noAppointment} 
            </Box>
        </HStack>
    )
}



export default DataBox;