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
import PatientGraph from './PatientGraph';


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
                <Box p='50'>
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
                {/* <Image src={property.imageUrl} alt={property.imageAlt} />  */}
                <PatientGraph></PatientGraph>
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
                        <Td>Nabhaan Ali</Td>
                        <Td>M</Td>
                        <Td>0123456789</Td>
                    </Tr>
                    <Tr>
                        <Td>Nabhaan Ali</Td>
                        <Td>M</Td>
                        <Td>0123456789</Td>
                    </Tr>
                    <Tr>
                        <Td>Nabhaan Ali</Td>
                        <Td>M</Td>
                        <Td>0123456789</Td>
                    </Tr>
                    <Tr>
                        <Td>Nabhaan Ali</Td>
                        <Td>M</Td>
                        <Td>0123456789</Td>
                    </Tr>
                    <Tr>
                        <Td>Nabhaan Ali</Td>
                        <Td>M</Td>
                        <Td>0123456789</Td>
                    </Tr>
                    <Tr>
                        <Td>Nabhaan Ali</Td>
                        <Td>M</Td>
                        <Td>0123456789</Td>
                    </Tr>
                    <Tr>
                        <Td>Nabhaan Ali</Td>
                        <Td>M</Td>
                        <Td>0123456789</Td>
                    </Tr>
                    <Tr>
                        <Td>Nabhaan Ali</Td>
                        <Td>M</Td>
                        <Td>0123456789</Td> 
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
