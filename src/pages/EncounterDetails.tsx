import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  Heading,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Skeleton,
  Spacer,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import ApiService from "../services/ApiService";
import { format } from "date-fns";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { changeDatetoTZ } from "../common/utils";
import { Helmet } from "react-helmet";
import { Patient } from "../components/PatientTable";
import DeleteButton from "../components/DeleteButton";

function EncounterDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [encounter, setEncounter] = useState({
    id: "",
    diagnosis: "",
    additionalNotes: "",
    serviceDate: "",
    nextAppointment: "",
    doctor: "",
    patient: {} as Patient,
    createdAt: "",
    updatedAt: "",
  });

  const onNameClick = () => {
    navigate(`/patient/${encounter.patient.id}`);
  };

  useEffect(() => {
    ApiService.get(`/encounter/${id}`)
      .then((response) => {
        setLoading(false);
        setEncounter(response.data);
      })
      .catch((err) => {
        console.log(err);
        //   if (err && err.response) {
        //     console.log(err)
        //   }
      });
  }, []);
  return (
    <SideBar active="/encounter">
      <Helmet>
        <title>Encounter Details</title>
      </Helmet>
      <Container maxW={"7xl"}>
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/encounter">Encounter</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Encounter Details</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Spacer />
          <ButtonGroup gap="2">
            <DeleteButton type={"encounter"} id={encounter.id as string} />
          </ButtonGroup>
        </Flex>

        <SimpleGrid>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("blue.500", "blue.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mt={"4"}
                  mb={"4"}
                >
                  Encounter Info
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Patient</ListItem>
                    <ListItem>Doctor</ListItem>
                    <ListItem>Service Date</ListItem>
                    <ListItem>Next Appointment Date</ListItem>

                    <ListItem>Created At</ListItem>
                    <ListItem>Updated At</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>
                      <Link color={"blue.500"} onClick={onNameClick}>
                        {!loading && encounter.patient.firstName}{" "}
                        {!loading && encounter.patient.lastName}
                      </Link>

                      {loading && <Skeleton height="20px" />}
                    </ListItem>

                    <ListItem>
                      {!loading && encounter.doctor}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>

                    <ListItem>
                      {" "}
                      {!loading && encounter.serviceDate
                        ? format(new Date(encounter.serviceDate), "dd/MM/yyyy")
                        : ""}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>

                    <ListItem>
                      {" "}
                      {!loading && encounter.nextAppointment
                        ? format(
                            new Date(encounter.nextAppointment),
                            "dd/MM/yyyy"
                          )
                        : ""}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>

                    <ListItem>
                      {" "}
                      {!loading && encounter.createdAt
                        ? format(
                            new Date(encounter.createdAt),
                            "dd/MM/yyyy hh:mm bbb"
                          )
                        : ""}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>
                    <ListItem>
                      {!loading && encounter.updatedAt
                        ? format(
                            new Date(encounter.updatedAt),
                            "dd/MM/yyyy hh:mm bbb"
                          )
                        : ""}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>
                  </List>
                </SimpleGrid>
              </Box>

              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("blue.500", "blue.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Diagnosis
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  {!loading && encounter.diagnosis}
                  {loading && <Skeleton height="20px" />}
                </SimpleGrid>
              </Box>

              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("blue.500", "blue.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Additional Notes
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  {!loading && encounter.additionalNotes}
                  {loading && <Skeleton height="20px" />}
                </SimpleGrid>
              </Box>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
      <br />
    </SideBar>
  );
}

export default EncounterDetails;
