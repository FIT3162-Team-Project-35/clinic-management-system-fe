import { Badge, Box, Flex, Image, Skeleton } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Patient } from "../store/patient.slice";
import { PatientGraph } from "./PatientGraph";

function DashboardCard({
  patients,
  appointments,
  encounters,
  graphData,
}: {
  patients: any;
  appointments: any;
  encounters: any;
  graphData: any;
}) {
  const property = {
    imageUrl: "https://www.excel-easy.com/smi/examples/line-chart.png",
    imageAlt: "Today's patient appointment",
    appointmentTitle: "Appointments of Last 3 Days",
    recentPatientTitle: "Recent Patients",
  };

  const recentPatients = patients.slice(-10).reverse();
  return (
    <Flex direction={["column", "column", "row"]}>
      <Box
        maxW="m"
        borderWidth="1px"
        borderRadius="lg"
        overflowX="scroll"
        m={2}
      >
        <Box p={["10", "35", "50"]}>
          <Box display="flex" alignItems="baseline"></Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {property.appointmentTitle}
          </Box>
        </Box>
        {/* <Image src={property.imageUrl} alt={property.imageAlt} />  */}
        <PatientGraph
          appointments={appointments}
          graphData={graphData}
        ></PatientGraph>
      </Box>

      <Box maxW="m" borderWidth="1px" borderRadius="lg" overflow="scroll">
        <Box p="6">
          <Box display="flex" alignItems="baseline"></Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {property.recentPatientTitle}
          </Box>
        </Box>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Patient Name</Th>
                <Th>Gender</Th>
                <Th isNumeric>Contact Number</Th>
                <Th>Created Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {recentPatients.length === 0 && (
                <>
                  <Tr>
                    <Td>
                      {" "}
                      <Skeleton h="20px" rounded="lg" />
                    </Td>
                    <Td>
                      {" "}
                      <Skeleton h="20px" rounded="lg" />
                    </Td>
                    <Td>
                      {" "}
                      <Skeleton h="20px" rounded="lg" />
                    </Td>
                    <Td>
                      {" "}
                      <Skeleton h="20px" rounded="lg" />
                    </Td>
                  </Tr>
                </>
              )}
              {recentPatients.length > 0 &&
                recentPatients.map((p: Patient) => {
                  return (
                    <Tr>
                      <Td>{`${p.firstName} ${p.lastName}`}</Td>
                      <Td>{p.gender}</Td>
                      <Td>{p.contactNumber}</Td>
                      <Td>{format(new Date(p.createdAt), "dd/MM/yyyy")}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

export default DashboardCard;
