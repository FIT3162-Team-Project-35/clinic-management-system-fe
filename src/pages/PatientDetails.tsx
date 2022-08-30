import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Container,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Skeleton,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import ApiService from "../services/ApiService";
import { format } from "date-fns";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { changeDatetoTZ } from "../common/utils";
import { Helmet } from "react-helmet";

function PatientDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState({
    address: "",
    allergicDetails: "",
    city: "",
    contactNumber: "",
    createdAt: "",
    dob: "",
    emergencyContact: "",
    emergencyFirstName: "",
    emergencyLastName: "",
    emergencyRelationship: "",
    firstName: "",
    gender: "",
    id: "",
    lastName: "",
    medicalDetails: "",
    postcode: "",
    updatedAt: "",
  });

  useEffect(() => {
    ApiService.get(`/patient/${id}`)
      .then((response) => {
        setLoading(false);
        setPatient(response.data);
      })
      .catch((err) => {
        console.log(err);
        //   if (err && err.response) {
        //     console.log(err)
        //   }
      });
  }, []);
  return (
    <SideBar active="/patient">
      <Helmet>
        <title>Patient Details</title>
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
            <BreadcrumbLink href="/patient">Patient</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Patient Details</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Center>
          <VStack>
            <Avatar size="2xl" src="#"></Avatar>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {patient.firstName} {patient.lastName}
            </Heading>
          </VStack>
        </Center>
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
                  Patient Info
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Full Name</ListItem>
                    <ListItem>Gender</ListItem>
                    <ListItem>Contact No</ListItem>
                    <ListItem>Date Of Birth</ListItem>
                    <ListItem>Address</ListItem>
                    <ListItem>City</ListItem>
                    <ListItem>Post Code</ListItem>
                    <ListItem>Created At</ListItem>
                    <ListItem>Updated At</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>
                      {!loading && patient.firstName}{" "}
                      {!loading && patient.lastName}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>
                    <ListItem>
                      {!loading && patient.gender}{" "}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>
                    <ListItem>
                      {!loading && patient.contactNumber}{" "}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>
                    <ListItem>
                      {!loading && patient.dob}{" "}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>
                    <ListItem>
                      {!loading && patient.address}{" "}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>
                    <ListItem>
                      {!loading && patient.city}{" "}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>
                    <ListItem>
                      {!loading && patient.postcode}{" "}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>
                    <ListItem>
                      {" "}
                      {!loading && patient.createdAt
                        ? format(
                            new Date(patient.createdAt),
                            "dd/MM/yyyy hh:mm bbb"
                          )
                        : ""}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>
                    <ListItem>
                      {!loading && patient.updatedAt
                        ? format(
                            new Date(patient.updatedAt),
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
                  Emergency Contact
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Full Name</ListItem>
                    <ListItem>Contact No</ListItem>
                    <ListItem>Relationship</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>
                      {!loading && patient.emergencyFirstName}{" "}
                      {!loading && patient.emergencyLastName}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>
                    <ListItem>
                      {!loading && patient.emergencyContact}{" "}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>
                    <ListItem>
                      {!loading && patient.emergencyRelationship}{" "}
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
                  Medical Info
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Medical Details</ListItem>
                    <ListItem>Allergic Details</ListItem>{" "}
                  </List>
                  <List spacing={2}>
                    <ListItem>
                      {!loading && patient.medicalDetails}{" "}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>
                    <ListItem>
                      {!loading && patient.allergicDetails}{" "}
                      {loading && <Skeleton height="20px" />}
                    </ListItem>
                  </List>
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

export default PatientDetails;
