import { Badge, Box, Image } from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'


function DashboardCard() {
    const property = {
      imageUrl: 'https://www.excel-easy.com/smi/examples/line-chart.png',
      imageAlt: "Today's patient appointment",
      appointmentTitle: 'Appoitment',
      recentPatientTitle: 'Recent Patients',
    }
  
    return (
        <>
            <Box maxW='m' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Box p='6'>
                <Box display='flex' alignItems='baseline'></Box>
                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}>
                    {property.appointmentTitle}
                </Box>
                </Box>
                <Image src={property.imageUrl} alt={property.imageAlt} /> 
            </Box>

            <Box maxW='m' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Box p='6'>
                <Box display='flex' alignItems='baseline'></Box>
                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}>
                    {property.recentPatientTitle}
                </Box>
                </Box>
                <TableContainer>
                <Table size='sm'>
                    <Thead>
                    <Tr>
                        <Th>Patient Name</Th>
                        <Th>Gender</Th>
                        <Th isNumeric>Contact Number</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                        <Td>feet</Td>
                        <Td>centimetres (cm)</Td>
                        <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>0.91444</Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>0.91444</Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>0.91444</Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>0.91444</Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>0.91444</Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>0.91444</Td>
                    </Tr>
                    </Tbody>
                    <Tfoot>
                    <Tr>
                        <Th>Patient Name</Th>
                        <Th>Gender</Th>
                        <Th isNumeric>Contact Number</Th>
                    </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            </Box>
        </>
    )
}


export default DashboardCard;
